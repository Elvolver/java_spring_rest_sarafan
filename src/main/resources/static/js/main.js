function getIndex(list, id) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i;
        }
    }
    return -1;
}

let messageApi = Vue.resource("/message{/id}");

Vue.component('message-form', {
    props: ['messages', 'messageAtr'],
    data: function () {
        return {
            text: '',
        }
    },
    watch: {
        messageAtr: function (newVal, oldVal) {
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:
        '<div>' +
        '<input type="text" placeholder="Write something" v-model="text"/>' +
        '<input type="button" value="Save" @click="save" />' +
        '</div>',
    methods: {
        save: function () {
            let message = {text: this.text};

            if (this.id) {
                messageApi.update({id: this.id}, message).then(result =>
                    result.json().then(data => {
                            let index = getIndex(this.messages, data.id);
                            this.messages.splice(index, 1, data);
                            this.text = '';
                            this.id = '';
                        }
                    )
                )
            } else {
                messageApi.save({}, message).then(result =>
                    result.json().then(data => {
                        this.messages.push(data);
                        this.text = '';
                    })
                )
            }
        }
    }
});

Vue.component('message-row', {
    props: ['message', 'messages', 'editMethod'],
    template: '<div>' +
        '<i>({{message.id}})</i> {{message.text}}' +
        '<span>' +
        '<input type="button" value="Edit" @click="edit" />' +
        '<input type="button" value="X" @click="del" />' +
        '</span>' +
        '</div>',
    methods: {
        edit: function () {
            this.editMethod(this.message);
        },
        del: function () {
            messageApi.remove({id: this.message.id}).then(result => {
                if (result.ok) {
                    this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

Vue.component('messages-list', {
    props: ['messages'],
    data: function () {
        return {
            message: null
        }
    },
    template: '<div>' +
        '<message-form :messages="messages" :messageAtr="message"/>' +
        '<message-row v-for="message in messages" :message="message" :messages="messages" :key="message.id" :editMethod="editMethod"/>' +
        '</div>',
    created: function () {
        messageApi.get().then(result =>
            result.json().then(data =>
                data.forEach(message => this.messages.push(message))
            )
        )
    },
    methods: {
        editMethod: function (message) {
            this.message = message;
        }
    }
});

let app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
});