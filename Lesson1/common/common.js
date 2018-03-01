console.log('这是common.js文件');
import Test from 'test.js';
//模块化
export default {
  sayHello: function(name){
    console.log(this)
    console.log('sayHello', name);
  }
}