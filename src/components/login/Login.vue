<template>
  <div class="login">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <h2>账号登录</h2>
      <el-form-item label="用户名" prop="user">
        <el-input v-model.number="ruleForm.user"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <div class="yanzheng" v-show='codeSrc'>
        <el-form-item label="验证码" prop="imgCode" style="width:75%;" class='width-75'>
          <el-input v-model="ruleForm.imgCode">
          </el-input>
        </el-form-item>
        <img v-bind:src="codeSrc" alt="">
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import baseUrl from '../../model/config';

export default {
  data () {
    var checkUser = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户名不能为空'));
      } else {
        const reg = /^1[0-9]{10}$/;
        if (reg.test(value)) {
          if (this.codeSrc) {

          } else {
            this.codeSrc = `https://arbi-hn-test.seata.cn/api-core-service/api/public/image/loginCode?username=${value}&${Date.now()}`;
          }
          callback();
        } else {
          this.codeSrc = ``;
          callback(new Error('用户名为11位手机号'));
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var checkImgCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'));
      } else {
        const reg = /^[0-9]{4}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error('验证码为6位数字'));
        }
      }
    }
    return {
      ruleForm: {
        pass: '',
        user: '',
        imgCode: ''
      },
      token: '',
      codeSrc: '',
      baseUrl: baseUrl,
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        user: [
          { validator: checkUser, trigger: 'blur' }
        ],
        imgCode: [
          { validator: checkImgCode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(`https://arbi-hn-test.seata.cn/uaa/oauth/token`,
            {//参数
              scope: 'ui',
              username: this.ruleForm.user,
              password: this.ruleForm.pass,
              grant_type: 'password',
              user_type: 'PARTY',
              img_code: this.ruleForm.imgCode
            },
            {              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic YnJvd3Nlcjo='              }
            }).then((res) => {
              console.log(res)
              let token = res.body.access_token;
              localStorage.setItem('token', token)
              this.getUserInfo(token);
            }, () => {
              this.codeSrc = `https://arbi-hn-test.seata.cn/api-core-service/api/public/image/loginCode?username=${this.ruleForm.user}&${Date.now()}`
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getUserInfo (token) {
      this.$http.get(`https://arbi-hn-test.seata.cn/uaa/users/current/principal`,
        { headers: { Authorization: 'Bearer ' + token } })
        .then((response) => {
          localStorage.setItem('userInfo', JSON.stringify({
            role: response.currentRole,
            type: response.litigantInfoType,
            verifyStatus: response.litigantInfoType == 0 ? response.elementVerifyStatus : 0,
            realAuth: response.realAuth,
            realName: response.realName
          }));

          this.$router.push({ path: '/myCase' });
        }, () => {

        })
    },
    resetForm (ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: #fff;
  padding: 20px 40px 20px 0;
  border-radius: 8px;
  h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  .yanzheng {
    position: relative;
    img {
      position: absolute;
      width: 20%;
      height: 100%;
      right: 0;
      top: 0;
    }
  }
}
</style>