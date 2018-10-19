document.getElementById("id_business_version").innerHTML = "Bussiness version: 2018.10.19.2";


function EC2()
{
	this.read_data = function(){
		this.a = document.getElementById("id_a").value;
		this.b = document.getElementById("id_b").value;
		this.c = document.getElementById("id_c").value;
	};
	this.solve2 = function(){
		var delta = this.b * this.b - 4 * this.a * this.c;
		
		if (delta >= 0){
			this.x1 = {re:(-this.b - Math.sqrt(delta)) / (2 * this.a), im:0};
			this.x2 = {re:(-this.b + Math.sqrt(delta)) / (2 * this.a), im:0};
		}
		else{
			this.x1 = {re:-this.b / (2 * this.a), im:-Math.sqrt(-delta) / (2 * this.a)};
			this.x2 = {re:-this.b / (2 * this.a), im: Math.sqrt(-delta) / (2 * this.a)};
		}	
	};
	this.print_solutions = function(){
		document.getElementById("id_x1").innerHTML = this.x1.re + " + " + this.x1.im + "i";
		document.getElementById("id_x2").innerHTML = this.x2.re + " + " + this.x2.im + "i";	
	};
}
//-------------------------------------------
function solve()
{
	var ec2 = new EC2();
	ec2.read_data();
	ec2.solve2();
	ec2.print_solutions();
}