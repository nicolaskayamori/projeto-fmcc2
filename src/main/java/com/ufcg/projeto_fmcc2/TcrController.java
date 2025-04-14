package com.ufcg.projeto_fmcc2;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TcrController {

    @GetMapping("/test")
    public String getTCRsteps(
            @RequestParam String[] ladoEsquerdo,
            @RequestParam int[] ladoDireito,
            @RequestParam int[] mod
    ) {
        String msg = "verificar se os mods sao CoPrimos:\n";
        if (!TcrStatic.coPrimos(mod)) return msg += "\nnao e possivel calcular, os mods nao sao CoPrimos\n";
        msg += "\neles sao CoPrimos";
        msg += "\n\nAjustar as equacoes que precisam calcular inverso:\n";
        for (int i = 0; i < ladoDireito.length; i++) {
            if (ladoEsquerdo[i].charAt(0) != 'x') {
                msg += ladoEsquerdo[i] + " = " + ladoDireito[i] + "(mod " + mod[i] + ") precisa calcular inverso\n";
                int coeficienteA = TcrStatic.calcularInversoMultiplicativo(ladoEsquerdo[i], ladoDireito[i], mod[i]);
                if (coeficienteA == -1)
                    return msg += "\nNao foi possivel calcular esse TCR, pois a equacao \n\n-> " + ladoEsquerdo[i] + " = " + ladoDireito[i] + "(mod " + mod[i] + ")" + ", apresenta mod: " + mod[i]
                            + " e ladoEsquerdo: " + ladoEsquerdo[i].charAt(0) + ", nao CoPrimos";
                ladoDireito[i] *= coeficienteA;
            }
            ladoEsquerdo[i] = "x";
        }

        msg += "\nCalcular o TCR agora: \n\n";
        msg += TcrStatic.tcrStep(ladoEsquerdo, ladoDireito, mod);
        return msg;
    }
}

