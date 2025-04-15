package com.ufcg.projeto_fmcc2;

import java.util.Arrays;
import java.util.List;

public class TcrStatic {

    public static String tcrStep(List<EquacaoDTO> equacoes) {
        String retorno = "Calculando o M (multipliacaco de todos os mod, que sao coPrimos)\n\n";
        int M = calcularM(equacoes);
        int[] todosCalculos = new int[equacoes.size()];
        retorno += "realiza a divisao do M por cada mod de cada equacao, e depois calculamos seus inversos\n";
        int i = 1;
        for (EquacaoDTO equacao : equacoes) {
            int mod = equacao.getMod();
            int m = M / mod;
            retorno += "\ncalculamos o m de cada equacao: m" + i + " = " + m;
            todosCalculos[i - 1] = calcularInversoMultiplicativo(m, 1, mod) * equacao.getRight() * m;
            i++;
        }
        retorno += "\n\nobtemos os calculos de cada multiplicacao (m * d * c), agora basta somar todos e atribuir o mod de M, para descobri o valor de X\n\n";

        int resultado = ((Arrays.stream(todosCalculos).reduce(0, (a, b) -> a + b) % M + M) % M); // resultado Positivo
        return retorno += "chegamos ao resultado de: X = " + resultado;
    }

    private static int calcularM(List<EquacaoDTO> equacoes) {
        int M = 1;
        for (EquacaoDTO equacao : equacoes) {
            M *= equacao.getMod();
        }
        return M;
    }

    public static  Integer calcularInversoMultiplicativo(int ladoEsquerdo, int ladoDireto, int mod) {
        if (!coPrimos(ladoEsquerdo, mod))
            return null;
        return (euclidesExtendido(ladoEsquerdo, mod)[1] % mod + mod) % mod;
    }

    public static Integer calcularInversoMultiplicativo(String ladoEsquerdo, int ladoDireto, int mod) {
        int a = Integer.parseInt(ladoEsquerdo.substring(0, ladoEsquerdo.length() - 1)); // primeiro numero
        if (!coPrimos(a, mod))
            return null;
        return (euclidesExtendido(a, mod)[1] % mod + mod) % mod;
    }

    private static int[] euclidesExtendido(int a, int b) {
        if (b == 0) {
            return new int[] { a, 1, 0 };
        }

        int[] resultado = euclidesExtendido(b, a % b);
        int mdc = resultado[0];
        int x1 = resultado[1];
        int y1 = resultado[2];

        int x = y1;
        int y = x1 - (a / b) * y1;

        return new int[] {mdc, x, y}; // coeficiente de a
    }

    private static boolean coPrimos(int a, int b) {
        return mdc(a, b) == 1;
    }

    public static boolean coPrimos(List<EquacaoDTO> equacoes) {
        for (int i = 0; i < equacoes.size(); i++) {
            for (int j = i + 1; j < equacoes.size(); j++) {
                if (mdc(equacoes.get(i).getMod(), equacoes.get(j).getMod()) != 1) {
                    return false;
                }
            }
        }
        return true;
    }

    private static int mdc(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    public static String represenatcaEquacao(List<EquacaoDTO> equacoes) {
        String msg = "\n";
        for (int i = 0; i < equacoes.size(); i++) {
            msg += equacoes.get(i).getLeft() + " = " + equacoes.get(i).getRight() + "(mod " + equacoes.get(i).getMod() + ")\n";
        }
        return  msg;
    }
}
