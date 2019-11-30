function People(name) {
    this.name = name;
}
People.prototype.getName = function () {
    return this.name;
}
var a = new People('LiaoMM');
console.log(a.name);
console.log(a.getName());
console.log(Object.getPrototypeOf(a) === People.prototype);
var performanceS = function () {}
performanceS.prototype.calculate = function (salary) {
    return salary * 4;
}
var performanceA = function () {}
performanceA.prototype.calculate = function (salary) {
    return salary * 3;
}
var performanceB = function () {}
performanceB.prototype.calculate = function (salary) {
    return salary * 2;
}
var Bonus = function () {
    this.salary = null;
    this.strategy = null;
}
Bonus.prototype.setSalary = function (salary) {
    this.salary = salary;
}
Bonus.prototype.setStrategy = function (strategy) {
    this.strategy = strategy;
}
Bonus.prototype.getBonus = function () {
    return this.strategy.calculate(this.salary);
}
var a= new Bonus();
a.setSalary(1000);
a.setStrategy(new performanceS());
console.log(a.getBonus());
var strategies = {
    'S': function(salary) {
        return 4 * salary;
    },
    'A': function (salary) {
        return 3 * salary;
    },
    'B': function (salary) {
        return 2 * salary;
    }
}
var calculateBonus = function (leavel,salary) {
    return strategies[leavel](salary);
}
console.log(calculateBonus('A',1000));

var strategiesForm = {
    isNonEmpty: function (value,errorMsg) {
        if(value === ''){
            return errorMsg;
        }
    },
    minLength: function (value,length,errorMsg) {
        if(value.length < length){
            return errorMsg;
        }
    },
    isMobile: function (value,errorMsg) {
        if( !/(^1[3|5|8][0-9]{9}$)/.test(value) ){
            return errorMsg;
        }
    }
}
var Validator = function () {
    this.cache = [];
}
Validator.prototype.add = function (dom,rule,errorMsg) {
    var ary = rule.split(':');
    this.cache.push(function () {
        var strategyForm = ary.shift();
        ary.unshift(dom.value);
        ary.push(errorMsg);
        return strategiesForm[strategyForm].apply(dom,ary);
    })
}
Validator.prototype.start = function () {
    for(var i = 0,validatorFunc; validatorFunc = this.cache[i++];){
        var msg = validatorFunc();
        if(msg){
            return msg;
        }
    }
}
var registerForm = document.getElementById('registerForm');
var validataFunc = function () {
    var validator = new Validator();
    validator.add(registerForm.username,'isNonEmpty','用户名不能为空');
    validator.add(registerForm.password,'minLength:6','密码长度不能少于6位');
    validator.add(registerForm.phoneNumber,'isMobile','手机号码格式不正确');
    var errorMsg = validator.start();
    return errorMsg;
}
registerForm.onsubmit = function () {
    var errorMsg = validataFunc();
    if(errorMsg){
        alert(errorMsg);
        return false;
    }
}
