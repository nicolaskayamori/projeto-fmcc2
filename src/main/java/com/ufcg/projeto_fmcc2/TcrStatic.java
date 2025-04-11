package com.ufcg.projeto_fmcc2;

import java.util.Arrays;

public class TcrStatic {

    public static String tcrStep(String[] ladoEsquerdo, int[] ladoDireito, int[] mod) {
        String retorno = "Calculando o M (multipliacaco de todos os mod, que sao coPrimos)\n\n";
        int M = Arrays.stream(mod).reduce(1, (a, b) -> a * b);
        int[] todosCalculos = new int[mod.length];
        retorno += "realiza a divisao do M por cada mod de cada equacao, e depois calculamos seus inversos\n\n";
        for (int i = 0; i < mod.length; i++) {
            int m = M / mod[i];
            todosCalculos[i] = calcularInversoMultiplicativo(m, 1, mod[i]) * ladoDireito[i] * m;
        }
        retorno += "obtemos os calculos de cada multiplicacao (m * d * c), agora basta somar todos e atribuir o mod de M, para descobri o valor de X\n\n";

        int resultado = ((Arrays.stream(todosCalculos).reduce(0, (a, b) -> a + b) % M + M) % M); // resultado Positivo
        return retorno += "chegamos ao resultado de: X = " + resultado;
    }

    public static  int calcularInversoMultiplicativo(int ladoEsquerdo, int ladoDireto, int mod) {
        if (!coPrimos(new int[]{ladoEsquerdo, mod}))
            return -1;
        int coeficienteA = euclidesExtendido(ladoEsquerdo, mod)[1];
        return coeficienteA;
    }

    public static int calcularInversoMultiplicativo(String ladoEsquerdo, int ladoDireto, int mod) {
        int a = Character.getNumericValue(ladoEsquerdo.charAt(0)); // primeiro numero
        if (!coPrimos(new int[] {a, mod}))
            return -1;
        int coeficienteA = euclidesExtendido(a, mod)[1];
        return coeficienteA;
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

    public static boolean coPrimos(int[] numeros) {
        int resultado = numeros[0];
        for (int i = 1; i < numeros.length; i++) {
            resultado = mdc(resultado, numeros[i]);
            if (resultado != 1)
                return false;
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
}
