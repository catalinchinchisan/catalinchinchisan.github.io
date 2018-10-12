document.getElementById("id_business_version").innerHTML = "Business version 2018.10.12.3"

function read_data(){
    var a = document.getElementById("id_a").value;
    var b = document.getElementById("id_b").value;
    var c = document.getElementById("id_c").value;
    var coef = {a:a,b:b,c:c};
    return coef;
}
function compute_delata(coef){
    return coef.b*coef.b-4*coef.a*coef.c;
}

function print_solution(solutins, delta){
    if(delta >= 0){
        document.getElementById("id_x1").innerHTML = solutins.x1.re;
        document.getElementById("id_x2").innerHTML = solutins.x2.re;
    }else{
        if(solutins.x1_im > 0) document.getElementById("id_x1").innerHTML = solutins.x1.re + " + " + solutins.x1.im + "i";
        else document.getElementById("id_x1").innerHTML = solutins.x1.re + " " + solutins.x1.im + "i";
        if(solutins.x2_im > 0) document.getElementById("id_x2").innerHTML = solutins.x2.re + " + " + solutins.x2.im + "i";
        else document.getElementById("id_x2").innerHTML = solutins.x2.re + " " + solutins.x2.im + "i";
    }
}
function solve2(coef, delta){

    var x1_re,x1_im,x2_re,x2_im;
    if(delta < 0){
        x1_re =  -coef.b / (2 * coef.a);
        x1_im = -Math.sqrt(-delta) / (2 * coef.a);
        x2_re =  -coef.b / (2 * coef.a);
        x2_im = Math.sqrt(-delta) / (2 * coef.a);
    }else{
        x1_re = (-coef.b - Math.sqrt(delta)) / (2 * coef.a);
        x1_im = 0;
        x1_re = (-coef.b + Math.sqrt(delta)) / (2 * coef.a);
        x1_im = 0;
    }
   var x1 = {re:x1_re,im:x1_im};
   var x2 = {re:x2_re, im:x2_im};
   var solutins = {x1:x1,x2:x2};
   return solutins;
}

function solve(){
    coef = read_data();
    delta = compute_delata(coef);
    solution = solve2(coef,delta)
    print_solution(solution,delta);


}
