# Requisito 8: Teste de comentário de linha única

int var_1 = 10
float _outra_var = .567
float numero = 123.45

/* Requisito 8: Teste de
  comentário de múltiplas linhas.
  Ele deve ser ignorado.
*/

if (var_1 >= 10)
  print(var_1)

# Requisito 4: Teste de outros operadores relacionais
if (var_1 == 10)
  print(var_1)
  
if (_outra_var < 1)
  print(_outra_var)
  
if (_outra_var != numero)
  print(numero)

# Requisito 9: Teste de erro léxico com caractere inválido
@