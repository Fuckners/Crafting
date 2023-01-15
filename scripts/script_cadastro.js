
window.addEventListener('beforeunload', function (e) {
    save()
});

function tempo(radioId) {
    const botoes = document.querySelectorAll('#perfil button')
    const nick = document.getElementById('nick')
    const loginInputs = document.querySelectorAll('#perfil input')
    const loginLabels = document.querySelectorAll('#perfil label')

    if (radioId == 'sair') {

        // visiveis:
        botoes[2].style.display = 'block' // btn sair
        nick.style.display = 'block' // username

        // invisiveis:
        // labels/inputs username/password/repassword
        for (input of loginInputs) {
            input.style.display = 'none'
        }
        for (label of loginLabels) {
            label.style.display = 'none'
        }

        botoes[1].style.display = 'none'// btn login
        botoes[0].style.display = 'none'// btn login

    } else {

        // visiveis:
        botoes[0].style.display = 'block' // btn cadastro
        botoes[1].style.display = 'block' // btn login

        // labels/inputs username/password/repassword
        for (input of loginInputs) {
            input.style.display = 'block'
        }
        for (label of loginLabels) {
            label.style.display = 'block'
        }

        // invisiveis:
        nick.style.display = 'none' // username
        botoes[2].style.display = 'none' // btn sair
    }
}

function cadastrar() {
    // cadastrar a pessoa e é isso
}

function login() {
    // logar e talvez carregar os itens que estava usando da ultima vez que jogou
}

function logout() {
    save()
    //deslogar
}

function save() { // salvar os itens caso me de vontade de fazer isso
    // verificar se está logado
    // salvar o game
}