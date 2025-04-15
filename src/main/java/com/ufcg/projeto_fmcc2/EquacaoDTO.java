package com.ufcg.projeto_fmcc2;

public class EquacaoDTO {

    private String left;
    private int right;
    private int mod;

    public int getMod() {
        return mod;
    }

    public int getRight() {
        return right;
    }

    public String getLeft() {
        return left;
    }

    public void setLeft(String left) {
        this.left = left;
    }

    public void setRight(int right) {
        this.right = right;
    }

    public void setMod(int mod) {
        this.mod = mod;
    }
}
