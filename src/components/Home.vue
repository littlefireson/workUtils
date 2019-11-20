<template>
    <!-- {{msg}}
        <button @click='goNews()'>跳转到新闻</button>
        {{this.$store.state.count}}
        <el-button @click="incCount()" type="primary">增加数量</el-button>
        <v-header></v-header> -->
    <div class="banner">
        <el-row :gutter="20">
            <el-col :span="6" :offset="14">
                <v-Login></v-Login>
            </el-col>
        </el-row>
    </div>

</template>

<script>
//引入 store 注意名字不要变
import store from '../vuex/store.js';
import Header from './common/Header.vue';
import Footer from './common/Footer.vue';
import Login from './login/Login.vue';
export default {
    data () {
        return {
            msg: '这是首页组件',
            input: '',
            show: false,
            area: {
                text: '',
                question: '题目',
                answer: '12312312',
            }
        }
    },
    store,
    methods: {
        showAnswer () {
            this.show = true;
        },
        goNews () {
            //注意官方文档写错了

            this.$router.push({ path: '/news' });
        },
        incCount () {
            // 改变vuex storede值
            // store.commit('incCount');
            this.$store.commit('incCount');
            // 触发state里面的数据
        }
    },
    components: {
        'v-Login': Login,
    }
}
</script>

<style lang="scss" scoped>
.banner {
  background-image: url(../assets/images/banner_new.jpg);
  background-size: cover;
  min-height: 411.5px !important;
}
</style>