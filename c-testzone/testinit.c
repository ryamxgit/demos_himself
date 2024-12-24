#include "stdio.h"

int generarAsciiArt();

int main() {
	printf("\nPrueba de ejecucion inicial....\n\n");
	generarAsciiArt();
	return 0;
}

int generarAsciiArt() {
	printf(R"(    _\/_
     /\
     /\
    /  \
    /~~\o
   /o   \
  /~~*~~~\
 o/    o \
 /~~~~~~~~\~`
/__*_______\
     ||
   \====/
    \__/
)");
return 0;
}
