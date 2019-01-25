

    var myApp = angular.module('myApp',[]);

myApp.controller('indexController', ['$scope', function ($scope, $rootScope) {
    $scope.apiCurrentResult = {};
    $scope.apiForecastResult = {};
    $scope.location = {};
    $scope.forecast = [];
    $scope.selectedDay = {};
    $scope.searchLocation = null;
    $scope.tempScale = "C";
    $scope.apiWeatherUrl = 'http://api.openweathermap.org/data/2.5/weather?';
    $scope.apiForecastUrl ='http://api.openweathermap.org/data/2.5/forecast?'; 
    $scope.weekday = [
        {
            long:"Sunday",
            short:"Sun"
        },{
            long:"Monday",
            short:"Mon"
        },{
            long:"Tuesday",
            short:"Tue"
        },{
            long:"Wednesday",
            short:"Wed"
        },{
            long:"Thursday",
            short:"Thu"
        },{
            long:"Friday",
            short:"Fri"
        },{
            long:"Saturday",
            short:"Sat"
        }];
    //get location
    navigator.geolocation.getCurrentPosition(function(e){
        $scope.location = {
            "lat": e.coords.latitude,
            "lon": e.coords.longitude
        }
        $scope.getCurrentWeather($scope.location);
        $scope.getForecastWeather($scope.location);
    }, function(e){
        alert("error getCurrentPosition")
    });
    $scope.search = function(){
        if($scope.searchLocation != null){
            $scope.getCurrentWeather($scope.searchLocation);
            $scope.getForecastWeather($scope.searchLocation);
        }
    }
    $scope.getSearchByVoice = function(){
       var speech = new webkitSpeechRecognition();

        speech.lang = "en-US";

        speech.onresult = on_result;
        speech.onspeechend = on_speech_end;

        speech.start();

        function on_speech_end(){
            speech.stop();
        }


        function on_result(e){
            if(e.results[0][0].confidence > 0.75){
                $scope.searchLocation = e.results[0][0].transcript;
                $scope.getCurrentWeather($scope.searchLocation);
                $scope.getForecastWeather($scope.searchLocation);
            }else{
                alert("I don't understand!!");
            }
            

        }
        
    }
    
    $scope.setTempScale = function(){
        if($scope.tempScale == "C"){
            $scope.tempScale = "K";
        }
        else if($scope.tempScale == "K"){
            $scope.tempScale = "F";
        }
        else if($scope.tempScale == "F"){
            $scope.tempScale = "C";
        }
    }

    $scope.selectDay = function(day){
        $scope.selectedDay = day;
    }

    $scope.kToC = function(temp){
        return (temp - 273.15).toFixed(1);
    }
    $scope.kToF = function(temp){
        return (((temp-273.15)*1.8)+32).toFixed(1);
    }
    
    $scope.forecastPreproces = function(forecastData){
        var forecast = [];
        var currentDate = new Date(forecastData.list[0].dt_txt);
        var forecastDate = 0;
        var averageTemp = 0;
        var forecastDayList = [];
        angular.forEach(forecastData.list, function(elem){
            forecastDate = new Date(elem.dt_txt);
            elem.main.temp = parseFloat(elem.main.temp.toFixed(1));
            elem.main.temp_max = parseFloat(elem.main.temp_max.toFixed(1));
            elem.main.temp_min = parseFloat(elem.main.temp_min.toFixed(1));
            elem["timeText"] = new Date(elem.dt_txt).getHours() + ":00";
           
            if(currentDate.getDate() < forecastDate.getDate()){
                //make push
               
                averageTemp =  averageTemp/8;
                forecast.push({
                    "date": currentDate,
                    "dayNo": currentDate.getDay(),
                    "dayText": $scope.weekday[ currentDate.getDay()],
                    "tempK": averageTemp.toFixed(1),
                    "list": forecastDayList
                })
                averageTemp = 0;
                forecastDayList = [];
                currentDate = forecastDate;
                forecastDayList.push(elem)
                averageTemp = averageTemp + elem.main.temp;
            }else{
                forecastDayList.push(elem)
                averageTemp = averageTemp + elem.main.temp;
            }
            
        });
        averageTemp =  averageTemp/8;
        forecast.push({
            "date": currentDate,
            "dayNo": currentDate.getDay(),
            "dayText": $scope.weekday[ currentDate.getDay()],
            "tempK": averageTemp.toFixed(1),
            "list": forecastDayList
        })
        forecast.splice(0,1);
        return forecast;
    }


        
    $scope.getCurrentWeather = function(data){
        var url = '';
        if(data != undefined && data != null){
            if(data.lat != undefined && data.lon != undefined){
                url =  $scope.apiWeatherUrl + 'lat='+data.lat+'&lon='+data.lon+'&appid=e0e6f0145db5b87647c4cf905da42f49';
            }
            if(typeof(data) == "string"){
                url =  $scope.apiWeatherUrl + 'q=' + data+'&appid=e0e6f0145db5b87647c4cf905da42f49';
            }
    
            $.ajax({url: url, success: function(result){
                $scope.apiCurrentResult = result;
                $scope.apiCurrentResult.main.temp = $scope.apiCurrentResult.main.temp.toFixed(1);
                $scope.searchLocation = $scope.apiCurrentResult.name;
                $scope.speak($scope.apiCurrentResult.main.temp);
                $scope.$apply();
            },error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status,thrownError);
              }
            })
            
           
        }else{
            alert("getCurrentWeather data undefined");
        }
       
    }
    $scope.speak = function(temp){
        var text = "";
        if($scope.tempScale == "C"){
            text = "The temperature in " + $scope.searchLocation + " is " + $scope.kToC(temp) +"degrees celsius";
        }
        else if($scope.tempScale == "K"){
            text = "The temperature in " + $scope.searchLocation + " is " + temp +"degrees kelvin";
        }
        else {
           text = "The temperature in " + $scope.searchLocation + " is " + $scope.kToF(temp) +" degrees fahrenheit";
        }
        speechSynthesis.speak(new SpeechSynthesisUtterance(text))
        
    }
    $scope.getForecastWeather = function(data){
        var url = '';
        if(data != undefined && data != null){
            if(data.lat != undefined && data.lon != undefined){
                url =  $scope.apiForecastUrl + 'lat='+data.lat+'&lon='+data.lon+'&appid=e0e6f0145db5b87647c4cf905da42f49';
            }
            if(typeof(data) == "string"){
                url =  $scope.apiForecastUrl + 'q=' + data+'&appid=e0e6f0145db5b87647c4cf905da42f49';
            }
    
            $.ajax({url: url, success: function(result){
                $scope.forecast = $scope.forecastPreproces(result);
                $scope.$apply();
            },error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status,thrownError);
              }
            })
            
           
        }else{
            alert("getForecastWeather data undefined");
        }
       
    }
    
  
}]);