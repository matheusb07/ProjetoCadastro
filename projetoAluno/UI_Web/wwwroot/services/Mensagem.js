sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/MessageToast"

], function (MessageBox,
    MessageToast) {
    "use strict";
    return {

        confirmacao: function (mensagem, funcaoCallback, id) {
            return MessageBox.confirm(mensagem, {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: (acao) => {
                    if (acao === MessageBox.Action.YES) {
                        return funcaoCallback.apply(this, id)
                    }
                }
            });
        },
        erro: function (mensagem) {
            return MessageBox.error(mensagem, {
                actions: [MessageBox.Action.OK]
            });
        },

        aviso(mensagem) {
            const delay = 500;
            setTimeout(function () {
                MessageToast.show(mensagem, {
                });
            }, delay);
        }
    }
});