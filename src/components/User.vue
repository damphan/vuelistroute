<template>
<b-container class="w-400px">
    <b-card
        v-if="user"
        :title="userName"
        :img-src="userAvatar"
        img-left
        tag="article"
        >
        <b-card-text>
        User ID: {{ userId }}
        </b-card-text>
    </b-card>
</b-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'User',
    data() {
        return {
        }
    },
    computed: {
        ...mapState({ user: state => state.user.user }),
        userName() {
            return this.user ? this.user.first_name + ' ' + this.user.last_name : ''
        },
        userId() {
            return this.user ? this.user.id : ''
        },
        userAvatar() {
            return this.user ? this.user.avatar : ''
        }
    },
    created() {
        this.$store.dispatch('user/resetUser');
        this.$store.dispatch('user/getUser', this.$route.params.id);
    }
}
</script>