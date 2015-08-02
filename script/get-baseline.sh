cat $(node -e 'console.log(require("word-list"))') | php -R 'print metaphone("$argn") . "\n";' > "test/fixtures.txt"
