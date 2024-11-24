sap.ui.define([
    "sap/ui/model/resource/ResourceModel"
], function (ResourceModel) {
    "use strict";

    const i18nModel = new ResourceModel({
        bundleName: "ControleDeAlunos.i18n.i18n",
        bundleUrl: "../i18n/i18n.properties"
    });
    const i18n = i18nModel.getResourceBundle();
    const nenhumErro = '';
    const campoVazio = '';
    const iVazio = "campoVazio"
    const mensagemCampoVazio = i18n.getText(iVazio);

    return {

        _validarNome: function (campo) {

            const nome = campo.getValue().trim();
            const valorMinimodeCaracteres = 2;
            const padrao = /[^a-zà-ú\s]/gi;
            const curto = "nomeCurto"
            const caracteres = "caracteresEspeciais"
            const memsagemNomeCurto = i18n.getText(curto);
            const possuiCaracteresEspeciais = i18n.getText(caracteres);

            if (nome === campoVazio) {
                return mensagemCampoVazio;
            }
            if (nome.length <= valorMinimodeCaracteres) {
                return memsagemNomeCurto;
            }
            if (padrao.test(nome)) {
                return possuiCaracteresEspeciais
            }
            return nenhumErro;
        },
        _validarCPF: function (campo) {
            const cpf = campo.getValue().replace(/\.|-/g, "").trim();
            const mensagemCPFInvalido = i18n.getText("cpfInvalido")
            const numerosRepetidos = [
                '00000000000',
                '11111111111',
                '22222222222',
                '33333333333',
                '44444444444',
                '55555555555',
                '66666666666',
                '77777777777',
                '88888888888',
                '99999999999'
            ];

            function _validaPrimeiroDigito(cpf) {
                let soma = 0;
                let multiplicador = 10;

                for (let tamanho = 0; tamanho < 9; tamanho++) {
                    soma += cpf[tamanho] * multiplicador;
                    multiplicador--
                }

                soma = (soma * 10) % 11;

                if (soma == 10 || soma == 11) {
                    soma = 0;
                }

                return soma != cpf[9];
            }

            function _validaSegundoDigito(cpf) {
                let soma = 0;
                let multiplicador = 11;

                for (let tamanho = 0; tamanho < 10; tamanho++) {
                    soma += cpf[tamanho] * multiplicador;
                    multiplicador--
                }

                soma = (soma * 10) % 11;

                if (soma == 10 || soma == 11) {
                    soma = 0;
                }

                return soma != cpf[10];
            }

            if (cpf === campoVazio) {
                return mensagemCampoVazio;
            }

            if (numerosRepetidos.includes(cpf) || _validaPrimeiroDigito(cpf) || _validaSegundoDigito(cpf)) {
                return mensagemCPFInvalido;
            }

            return nenhumErro;
        },

        _validarTelefone: function (campo) {
            const telefone = campo.getValue().replace(/[^0-9]/g, "").trim();
            const formato = /^\d{10,11}$/;
            const telInvalido = "telefoneInv"
            const mensagemTelefoneInvalido = i18n.getText(telInvalido)

            if (telefone === campoVazio) {
                return mensagemCampoVazio;
            }

            if (!formato.test(telefone)) {
                return mensagemTelefoneInvalido;
            }
            return nenhumErro;
        },

        _validarNascimento: function (campo) {
            const dataInserida = campo.getValue();
            const dataNascimento = new Date(dataInserida);
            const hoje = new Date(Date.now());
            const anoAtual = hoje.getFullYear();
            const anoNascimento = dataNascimento.getFullYear();
            const idadeMaxima = 99;
            const idadeMinima = 12;
            const idadeInv = "idadeInvalida"
            const mensagemIdadeInvalida = i18n.getText(idadeInv);


            if (dataInserida === campoVazio) {
                return mensagemCampoVazio;
            }

            if (anoAtual - anoNascimento < idadeMinima || anoAtual - anoNascimento > idadeMaxima) {
                return mensagemIdadeInvalida;
            }
            return "";
        },

        _limparErros: function (campo) {
            const vazio = "";
            campo.setValueState(sap.ui.core.ValueState.None);
            campo.setValueStateText(vazio);
        },

        _adicionarMensagemDeErros: function (campo, mensagem) {
            campo.setValueStateText(mensagem);
            campo.setValueState(sap.ui.core.ValueState.Error);
        },

        _formatarCampo: function (campo) {
            return campo.replace(/[ ().-]/g, "").trim();
        },

        formatarCamposFormulario: function (modelo) {
            return {
                id: modelo.id,
                nome: modelo.nome,
                cpf: this._formatarCampo(modelo.cpf),
                telefone: this._formatarCampo(modelo.telefone),
                nascimento: modelo.nascimento
            }
        },
        validarCamposFormulario: function (view) {
            const idNome = "campoNome";
            const idCPF = "campoCPF";
            const idTelefone = "campoTelefone";
            const idNascimento = "campoNascimento";

            const nomeCampo = view.byId(idNome);
            const cpfCampo = view.byId(idCPF);
            const telefoneCampo = view.byId(idTelefone);
            const nascimentoCampo = view.byId(idNascimento);

            const nomeErro = this._validarNome(nomeCampo);
            const cpfErro = this._validarCPF(cpfCampo);
            const telefoneErro = this._validarTelefone(telefoneCampo);
            const nascimentoErro = this._validarNascimento(nascimentoCampo);

            let formularioValidado = true;

            if (nomeErro !== nenhumErro) {
                this._adicionarMensagemDeErros(nomeCampo, nomeErro);
                formularioValidado = false;
            } else {
                this._limparErros(nomeCampo);
            }

            if (cpfErro !== nenhumErro) {
                this._adicionarMensagemDeErros(cpfCampo, cpfErro);
                formularioValidado = false;
            } else {
                this._limparErros(cpfCampo);
            }

            if (telefoneErro !== nenhumErro) {
                this._adicionarMensagemDeErros(telefoneCampo, telefoneErro);
                formularioValidado = false;
            } else {
                this._limparErros(telefoneCampo);
            }

            if (nascimentoErro !== nenhumErro) {
                this._adicionarMensagemDeErros(nascimentoCampo, nascimentoErro);
                formularioValidado = false;
            } else {
                this._limparErros(nascimentoCampo);
            }
            return formularioValidado;
        }
    };
}
);