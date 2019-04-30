<template>
<b-container fluid>
    <b-row>
        <b-col class="text-right">
            <b-form-group :disabled="pagDisabled" label="Item per page" label-cols-md="9">
                <b-input-group>
                    <b-form-select v-model="perPage" :options="[5, 10, 15]" class="cols-md-3" @change="reloadPerPage">
                    </b-form-select>
                </b-input-group>
            </b-form-group>
        </b-col>
        <b-col class="text-right">
            <b-form-group :disabled="pagDisabled" label="Sort" label-cols-md="3">
                <b-input-group>
                    <b-form-select v-model="sortBy" :options="sortableFields">
                        <option slot="first" :value="null">--</option>
                    </b-form-select>
                    <b-form-select v-model="sortOrder" :disabled="!sortBy">
                        <option :value="false">Asc</option>
                        <option :value="true">Desc</option>
                    </b-form-select>
                </b-input-group>
            </b-form-group>
        </b-col>
    </b-row>
    <b-table striped hover :items="userList" :fields="userFields" :sort-by.sync="sortBy" :sort-desc.sync="sortOrder" :busy="isLoading" :thead-tr-class="'text-center'" :tbodyTrClass="'selectable'" @row-clicked="onRowClick">
        <template slot="no" slot-scope="row">
            {{ pageOffset + row.index + 1 }}
        </template>
        <template slot="avatar" slot-scope="data">
            <b-img-lazy :src="data.value" thumbnail rounded style="width: 64px;"></b-img-lazy>
        </template>
        <div slot="table-busy" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
        </div>
    </b-table>
    <b-col>
        <b-pagination v-model="currPage" align="center" :disabled="pagDisabled" :total-rows="totalRows" :per-page="perPage" @input="reload"></b-pagination>
    </b-col>
    <b-modal :id="userInfoModal.id" :title="'User Info'" ok-only>
        <div class="text-center">
            <b-img v-if="userInfoModal.item" :src="userInfoAvatar" rounded="circle"></b-img>
        </div>
        <div v-if="userInfoModal.item" class="text-center">
            {{ userInfoModal.item.first_name + ' ' + userInfoModal.item.last_name }}
        </div>
    </b-modal>
</b-container>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'UserList',
        data() {
            return {
                userFields: {
                    no: { label: '#', tdClass: 'text-right' },
                    avatar: { label: 'Avatar', tdClass: 'text-center' },
                    first_name: { label: 'First Name', sortable: true },
                    last_name: { label: 'Last Name', sortable: true },
                    // actions: { label: 'Actions' }
                },
                isLoading: false,
                currPage: 1,
                perPage: 5,
                totalRows: 0,
                pagDisabled: false,
                userInfoModal: {
                    id: 'user-info-modal',
                    item: null
                },
                sortBy: null,
                sortOrder: false
            }
        },
        computed: {
            ...mapState({
                userList: state => state.userList.userList
            }),
            // userInfoAvatar: function() {
            //     return this.userInfoModal.item ? this.userInfoModal.item.avatar : '';
            // },
            // userInfoName: function() {
            //     return this.userInfoModal.item ? this.userInfoModal.item.first_name + ' ' + this.userInfoModal.item.last_name : '';
            // },
            pageOffset: function() {
                return (this.currPage - 1) * this.perPage;
            },
            sortableFields: function() {
                return Object.keys(this.userFields)
                    .filter(f => this.userFields[f].sortable)
                    .map(f => {
                        return { text: this.userFields[f].label, value: f }
                    })
            }
        },
        methods: {
            ...mapActions('userList', ['reload', 'reloadPerPage']),
            onRowClick: function(item) {
                this.$router.push({ name: 'user', params: { id: item.id } })
                // this.userInfoModal.item = item;
                // this.$root.$emit('bv::show::modal', this.userInfoModal.id, event.target);
            }
        },
        created() {
            this.isLoading = true;
            this.$store.dispatch('userList/reload', {
                perPage: this.perPage,
                page: 1,
                startCallback: () => {
                    this.isLoading = true;
                    this.pagDisabled = true;
                },
                endCallback: (page, total) => {
                    this.isLoading = false;
                    this.page = page;
                    this.totalRows = total;
                    this.pagDisabled = false;
                }
            });
        }
    }
</script>