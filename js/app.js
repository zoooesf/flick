//  ************************* Splash Movies *************************
function getSplash() {

    $(".hide_all").hide();

    var getSplash = $.ajax({
        url: "services/splash.php",
        type: "POST",
        dataType: "json"
    });


    getSplash.done(function (data) {

        var content = "";
        $.each(data, function (i, item) {
            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var image_id = item.cover_id;
            var image_name = item.cover_name;

            var movie_image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div class="large-3 medium-6 small-12 cell more-top movie hover splashMovie" data-id="` + movie_id + `">
                <div style="width: 100%;">
                    <img src="` + movie_image + `" alt="` + movie_name + `" class="movieBorder">
                    <div class="card-section">
                        <h4 class="name">` + movie_name + `</h4>
                    </div>
                </div>
            </div>`;

        });

        $(".splash_content").html(content);
        $(window).scrollTop(0);
        $(".splash_container").fadeIn();
    });

    getSplash.fail(function (jqXHR, textStatus) {
        alert("Woops! Something went Wrong! (getSplash)" +
            textStatus);
    });



}

//  ************************* Search *************************
function getSearch(search_text) {



    var getSearch = $.ajax({
        url: "services/search.php",
        type: "POST",
        data: {
            search_text: search_text
        },
        dataType: "json"
    });


    getSearch.done(function (data) {
        var content = "";

        $.each(data, function (i, item) {

            var type = item.type;

            if (type == "1") {
                var id = item.movie_id;
                var name = item.movie_name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "movie";
            } else {
                var id = item.people_id;
                var name = item.name;
                var image_id = item.cover_id;
                var image_name = item.cover_name;
                var className = "people";
            }

            var image = "./uploads/" + image_id +
                "/" + image_name;

            content += `<div data-id="` + id + `" class="search_container ` + className + ` clearFloat people cell hover">
                <div class="left">
                    <img src="` + image + `" alt="` + name + `">
                </div>
                <div class="right">` + name + `</div>
            </div>`;

        });

        $(".search_results").html(content).show();


    });

    getSearch.fail(function (jqXHR, textStatus) {
       // alert("Woops! Something went Wrong! (getSearch)" +textStatus);
    });



}

//  ************************* Movie *************************
function getMovie(movie_id) {

    $(".hide_all").fadeOut();

    var getMovie = $.ajax({
        url: "services/movie.php",
        type: "POST",
        data: {
            movie_id: movie_id
        },
        dataType: "json"
    });


    getMovie.done(function (data) {
        $(".movie_name").html(data.movie_name);
        $(".length").html(data.run_length);
        $(".release_date").html(data.movie_date_me);
        $(".description").html(data.description);

        var main_movie_image = "./uploads/" + data.cover_image_id +
            "/" + data.cover_image_name;

        $(".main_movie_image").attr("src", main_movie_image).attr("alt", data.movie_name);

        var content = "";
        $.each(data.related_movies, function (i, item) {
            var movie_id = item.movie_id;
            var movie_name = item.movie_name;
            var image_id = item.id;
            var image_name = item.name;

            var movie_image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div class="large-3 medium-6 small-12 cell more-top movie hover" data-id="` + movie_id + `">
                <div style="width: 100%;">
                    <img src="` + movie_image + `" alt="` + movie_name + `" class="movieBorder">
                    <div class="card-section">
                        <h5>` + movie_name + `</h5>
                    </div>
                </div>
            </div>`;

        });

        $(".related_movies").html(content);

        content = "";
        $.each(data.cast, function (i, item) {
            var people_id = item.people_id;
            var people_name = item.name;
            var image_id = item.image_id;
            var image_name = item.image_name;
            var character = item.character_name;

            var people_image = "./uploads/" + image_id +
                "/" + image_name;


            content += `<div class="large-3 medium-6 small-12 cell more-top people hover" data-id="` + people_id + `">
                <div style="width: 100%;">
                    <img src="` + people_image + `" alt="` + people_name + `" class="peopleBorder">
                    <div class="card-section">
                        <h5>` + people_name + `</h5>
                        <p>` + character + `</p>
                    </div>
                </div>
            </div>`;

        });

        $(".cast").html(content);
        $(window).scrollTop(0);
        $(".movie_container").fadeIn();


    });

    getMovie.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getMovie)" +
            textStatus);
    });



}
//  ************************* Actor *************************
function getPeople(people_id) {

    $(".hide_all").fadeOut();

    var getPeople = $.ajax({
        url: "services/people.php",
        type: "POST",
        data: {
            people_id: people_id
        },
        dataType: "json"
    });


    getPeople.done(function (data) {
        $(".people_name").html(data.people_name);
        $(".born").html(data.born);
        $(".died").html(data.died);
        $(".release_date").html(data.movie_date_me);
        $(".people_biography").html(data.people_biography);

        var people_id = data.people_id;

        var main_people_image = "./uploads/" + data.cover_image_id +
            "/" + data.cover_image_name;

        $(".main_people_image").attr("src", main_people_image).attr("alt", data.people_name);

        var content = "";
        $.each(data.movies, function (i, item) {
            var movie_id = item.movie_id;
            var image_id = item.image_id;
            var image_name = item.image_name;
            var movie_name = item.movie_name;
            var character_name = item.character_name;
            var year = item.year;



            var movie_images = "./uploads/" + image_id +
                "/" + image_name;

            content += `<div class="large-3 medium-6 small-12 related_people_movies movie grid-x hover cell more-top" data-id="` + movie_id + `">
        <div style="width: 100%;">
        <img class="movieBorder" src="` + movie_images + `" alt="` + movie_name + `">
        <div class="card-section">
                        <h5>` + movie_name + `</h5>
                        <p>` + character_name + `</p>
                    </div>
        </div>
        </div>`
        });

        $(".related_people_movies").html(content);

        $(window).scrollTop(0);
        $(".actor_container").fadeIn();




    });

    getPeople.fail(function (jqXHR, textStatus) {
        alert("Something went Wrong! (getPeople)" +
            textStatus);
    });



}



$(document).foundation();

$(document).ready(function () {

    getSplash();

    $("#search").keyup(
        function () {
            var search_text = $(this).val();
            getSearch(search_text);
        }
    );


    $(document).on("click", "body .movie", function () {
        var movie_id = $(this).attr("data-id");
        getMovie(movie_id);
    });

    $(document).on("click", "body .people", function () {
        var people_id = $(this).attr("data-id");
        getPeople(people_id);
    });

    $(document).on("click", "body .splash", function () {
        getSplash();
    });
    $(document).on("click", "body .splashActor", function () {
        alert("splashActor");

        getSplashActor();
    });


    $(".trending").slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
    });



});