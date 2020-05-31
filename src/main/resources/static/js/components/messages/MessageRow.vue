<template>
    <v-card class="my-2">
        <v-card-text primary-title>
            <div>
                <v-avatar
                        v-if="message.author && message.author.userpic"
                        size="36"
                >
                    <img
                            :src="message.author.userpic"
                            :alt="message.author.name"
                    >
                </v-avatar>
                <v-avatar
                        v-else
                        size="36"
                        color="indigo"
                >
                    <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>
                {{ authorName }}
            </div>
            <div>
                {{ message.text }}
            </div>
        </v-card-text>
        <media v-if="message.link" :message="message"></media>
        <v-card-actions>
            <v-btn value="Edit" @click="edit" small text round>Edit</v-btn>
            <v-btn icon @click="del" small>
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-card-actions>
        <comment-list
                :comments="message.comments"
                :message-id="message.id"
        ></comment-list>
    </v-card>
</template>

<script>
    import {mapActions} from 'vuex'
    import Media from "components/media/Media.vue";
    import CommentList from "components/comment/CommentList.vue";

    export default {
        props: ['message', 'editMessage'],
        components: {CommentList, Media},
        computed: {
            authorName() {
                return this.message.author ? this.message.author.name : 'Anonim'
            }
        },
        methods: {
            ...mapActions(['removeMessageAction']),
            edit() {
                this.editMessage(this.message)
            },
            del() {
                this.removeMessageAction(this.message)
            }
        }
    }
</script>

<style>

</style>
