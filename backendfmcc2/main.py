from math import gcd
from itertools import combinations

def resolve_teorema(lista_a, lista_b, lista_c):
    if not todos_coprimos(lista_c): return "Não é possível aplicar o TCR (Módulos não-coprimos entre si)."
    

    for i in range(len(lista_a)):
        
    #a = b mod c
    M = 1
    passos = []
    passo1 = "Passo 1: Multiplicação de "
    for i in range(len(lista_c)):
        M *= lista_c[i]
        if i != len(lista_c) -1:
            passo1 += str(lista_c[i]) + "*"
        else:
            passo1 += str(lista_c[i])

    passo1 += " = " + str(M)
    passos.append(passo1)


    return passos


def todos_coprimos(lista):
    for a, b in combinations(lista, 2):
        if gcd(a, b) != 1:
            return False
    return True



    
lista_1 = ["x","x","x"]
lista_2 = [2, 3, 2]
lista_3 = [3, 4, 5,6,7]
print(resolve_teorema(lista_1, lista_2, lista_3))
     