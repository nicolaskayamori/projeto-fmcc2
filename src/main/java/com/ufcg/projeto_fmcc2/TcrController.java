package com.ufcg.projeto_fmcc2;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*")
@RequestMapping("/equacoes")
@RestController
public class TcrController {

    @PostMapping
    public String getTCRsteps( @RequestBody List<EquacaoDTO> equacoes ) {

        String msg = "verificar se os mods sao CoPrimos:\n";
        if (!TcrStatic.coPrimos(equacoes))
            return msg += "\nnao e possivel calcular, os mods nao sao CoPrimos\n";

        msg += "\neles sao CoPrimos";
        msg += "\n\nAjustar as equacoes que precisam calcular inverso:\n";

        for (int i = 0; i < equacoes.size(); i++) {
            String left = equacoes.get(i).getLeft();
            int right = equacoes.get(i).getRight();
            int mod = equacoes.get(i).getMod();

            if (left.charAt(0) != 'x' && left.charAt(0) != '1' && TcrStatic.isInteger(left.substring(0, left.length() - 1))) {

                msg += left + " = " + right + "(mod " + mod + ") precisa calcular inverso\n";

                Integer coeficienteA = TcrStatic.calcularInversoMultiplicativo(left, right, mod);

                if (coeficienteA == null)
                    return msg += "\nNao foi possivel calcular esse TCR, pois a equacao -> \n\n" + left + " = "
                            + right + "(mod " + mod + ")" + ", apresenta mod: " + mod
                            + " e ladoEsquerdo: " + left.charAt(0) + ", nao CoPrimos";

                equacoes.get(i).setRight((right * coeficienteA) % mod);
            } else {
                msg += left + " = " + right + "(mod " + mod + ") nao precisa calcular inverso\n";
            }
            equacoes.get(i).setLeft("x");
        }

        msg += "\nEquacoes na forma inversa ou na sua forma padrao:" + TcrStatic.represenatcaEquacao(equacoes);
        msg += "\nCalcular o TCR agora: \n\n";
        msg += TcrStatic.tcrStep(equacoes);
        return msg;
    }
}

