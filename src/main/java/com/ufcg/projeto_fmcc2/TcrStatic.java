package com.ufcg.projeto_fmcc2;

import java.util.Arrays;
import java.util.List;

public class TcrStatic {

    public static String tcrStep(List<EquacaoDTO> equacoes) {
        String retorno = "Calculando o M (multipliacaco de todos os mod, que sao coPrimos)\n\n";
        int M = calcularM(equacoes);
        retorno += "Valor de M = " + M;
        int[] todosCalculos = new int[equacoes.size()];
        retorno += "\nRealiza a divisao do M por cada mod de cada equacao, e depois calculamos seus inversos\n";
        int i = 1;
        String calculoX = "X = ";
        for (EquacaoDTO equacao : equacoes) {
            int mod = equacao.getMod();
            int m = M / mod;
            int inverso = calcularInversoMultiplicativo(m, 1, mod);
            retorno += "\nCalculamos o m de cada equacao: " + M + "/" + mod + " => " + "m" + i + " = " + m;
            calculoX += representacao(inverso, equacao.getRight(), m, i, equacoes.size());
            todosCalculos[i - 1] = inverso * equacao.getRight() * m;
            i++;
        }
        retorno += "\n\nObtemos os calculos de cada multiplicacao (m * d * c), agora basta somar todos e atribuir o mod de M, para descobri o valor de X\n\n";
        retorno += calculoX + "\n\n";

        int resultado = ((Arrays.stream(todosCalculos).reduce(0, (a, b) -> a + b) % M + M) % M); // resultado Positivo
        return retorno += "Chegamos ao resultado de: X (mod " + M + ") = " + resultado;
    }

    private static String representacao(int inverso, int direita, int m, int indice, int len) {
        if (indice == len)
            return "(" + inverso + "*" + direita + "*" + m + ")";
        return "(" + inverso + "*" + direita + "*" + m + ") + ";
    }

    private static int calcularM(List<EquacaoDTO> equacoes) {
        int M = 1;
        for (EquacaoDTO equacao : equacoes) {
            M *= equacao.getMod();
        }
        return M;
    }

    public static  Integer calcularInversoMultiplicativo(int ladoEsquerdo, int ladoDireto, int mod) {
        int a = ((ladoEsquerdo % mod + mod) % mod);
        if (!coPrimos(ladoEsquerdo, mod))
            return null;
        return (euclidesExtendido(a, mod)[1] % mod + mod) % mod;
    }

    public static Integer calcularInversoMultiplicativo(String ladoEsquerdo, int ladoDireto, int mod) {
        int a = (((Integer.parseInt(ladoEsquerdo.substring(0, ladoEsquerdo.length() - 1))) % mod + mod) % mod); // primeiro numero
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
