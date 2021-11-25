const Url = "http://18.220.85.60/api/";


function fetchProductList() {

    jsonObj = [];
    item = {};
    var productList;
    var productListAdd;

    !($.trim($('#title').val()) == '') ? item ["title"] = $('#title').val(): '';
    !($.trim($('#operating_system').val()) == '') ? item ["operating_system"] = $('#operating_system').val(): '';
    !($.trim($('#min_price').val()) == '') ? item ["price_from"] = $('#min_price').val(): '';
    !($.trim($('#max_price').val()) == '') ? item ["price_to"] = $('#max_price').val(): '';

    jsonObj.push(item);

    $.ajax({
        url: Url+'GetProduct',
        type: 'get',
        dataType: 'json',
        contentType: 'text/plain',
        data: jsonObj[0],

        success: function (data) {
            productList='';

            $.each(data['data']['List'], function(i, item) {

                productListAdd = '<div class="col-sm-6 col-md-4 col-lg-3 mt-4" id="product'+item['id']+'">\n' +
                    '            <div class="card card-inverse card-info">\n' +
                    '                <img class="card-img-top" src="'+item['image']+'">\n' +
                    '                <div class="card-block">\n' +
                    '                    <h4><span class="badge badge-danger">'+item['price']+'</span></h4>\n' +
                    '                    <div class="meta card-text">\n' +
                    '                        <a style="color: deepskyblue">Category - Cell Phones</a>\n' +
                    '                    </div>\n' +
                    '                    <div class="card-text">\n' +
                    '                        '+item['title'].substring(0,50)+'... more\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <small>More information ...</small>\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="fetchOneProduct('+item['id']+')">Detail</button>\n' +
                    '                </div>\n' +
                    '                <div class="card-footer">\n' +
                    '                    <button class="btn btn-info float-right btn-sm" onclick="addToCart('+item['id']+')">Add to Cart</button>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>';
                productList=productList+productListAdd;

            });
            $('#items').html(productList);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function fetchOneProduct($id) {
    // function body
    var product = '';
    $.ajax({
        url: Url + 'GetOneProduct',
        type: 'get',
        dataType: 'json',
        contentType: 'text/plain',
        data: { "product_id":$id },
        success: function (data) {
            $.each(data['data']['List'], function (i, item) {
                product = '<div class="card justify-content-center pagination-centered" style="width:900px; height:auto">\n' +
                    ' <div class="container-fliud">\n' +
                    '     <div class="wrapper row">\n' +
                    '        <div class="preview col-md-6">\n' +
                    '           <div class="preview-pic tab-content">\n' +
                    '              <div class="tab-pane active" id="pic-1"><img src="' + item['image'] + '" /></div>\n' +
                    '         </div>\n' +
                    '    </div>\n' +
                    '         <div class="details col-md-6">\n' +
                    '            <h3 class="product-title" style="margin-top: 10px">' + item['title'] + '...</h3>\n' +
                    '           <div class="rating">\n' +
                    '               <button class="btn btn-info" id="comment" onclick="......">Submit Comment</button>\n' +
                    '           </div>\n' +
                    '          <p class="product-description">' + item['title'] + '</p>\n' +
                    '        <h5 class="price">Current Price: <span>' + item['price'] + '</span></h5>\n' +
                    '        <h6 class="price">Screen Size: <span>' + item['screen_size'] + '</span></h6>\n' +
                    '       <h6 class="price">Weight: <span>' + item['item_weight'] + '</span></h6>\n' +
                    '      <h6 class="price">Camera: <span>' + item['camera_description'] + '</span></h6>\n' +
                    '     <h6 class="price">Operating System: <span>' + item['operating_system'] + '</span></h6>\n' +
                    '    <div class="action">\n' +
                    '       <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#exampleModal" data-whatever="...">Submit Comment</button>\n' +
                    '            </div>\n' +
                    '       </div>\n' +
                    '   </div>\n' +
                    '   </div>\n' +
                    '   </div>\n';
            });
                $('#items').html(product);
                
        },
        error: function (data) {
            alert("Error while fetching data.");
        }

    });

}

function fetchComments($id) {
    var comment;
    var commentAdd;

    $.ajax({
        url: Url+'GetProductComment',
        type: 'get',
        dataType: 'json',
        data: {"product_id":$id},
        contentType: 'text/plain',
        success: function (data) {
            comment='';
            comment='<div class="panel panel-default" style="width:800px">\n' +
                '            <div class="panel-heading">\n' +
                '                <span class="glyphicon glyphicon-comment"></span>\n' +
                '                <h3 class="panel-title">\n' +
                '                    Comments</h3>\n' +
                '            </div>\n' +
                '            <div class="panel-body">\n' +
                '                <ul class="list-group">\n';
            $.each(data['data']['List'], function(i, item) {
                commentAdd ='                    <li class="list-group-item">\n' +
                    '                        <div class="row">\n' +
                    '                            <div class="col-xs-2 col-md-2">\n' +
                    '                                <img src="img/comment.png" class="img-circle img-responsive" alt="" /></div>\n' +
                    '                            <div class="col-xs-10 col-md-10">\n' +
                    '                                <div><p>'+item['comment']+'</p></div>\n' +
                    '                                <br/>\n' +
                    '                                <div><h5 style="color: red"> Score: '+item['score']+'</h5></div>\n' +
                    ' <div class="progress">\n' +
                    '  <div class="progress-bar" role="progressbar" aria-valuenow="'+item['score']+'"\n' +
                    '  aria-valuemin="0" aria-valuemax="5" style="width:'+(item['score']/5)*100+'%">\n' +
                    '  </div>\n' +
                    '</div>\n' +
                    '                            </br>\n' +
                    '                        </div>\n' +
                    '                    </li>';
                comment=comment+commentAdd;
            });
            comment=comment+'</ul></div></div>'
            $('#comment-list').html(comment);

        },
        error: function (data) {
            alert("Error while fetching data.");
        }
    });
}

function setComment($id) {

    var message =$('#message-text').val();
    var score =$('#score').val();

    $.ajax({
        url: Url+'SetComment',
        type: 'post',
        dataType: 'json',
        cache: true,
        async: true,
        global: false,
        data: JSON.stringify({"product_id": $id,"comment": message,"score": score}),
        contentType: 'text/plain',
        success: function (data) {
            $('#exampleModal').modal('hide');
            fetchOneProduct($id);
        },
        error: function (data) {
            alert("Outlet Creation Failed, please try again.");
        }

    });

}

function addToCart($id) {
    let email =$.trim($('#email').val());
    if( email !='') {
        // Save data to sessionStorage
        sessionStorage.setItem('email', email);
        $.ajax({
            url: Url + 'AddToCart',
            type: 'post',
            dataType: 'json',
            data: JSON.stringify({"product_id": $id, "email" : email}),
            contentType: 'text/plain',

            success: function (data)//Stuff goes here
            {
                fetchOneProduct($id);
            },

            error: function(data) {
                alert("wrong");
            }

        });   
    } else {
        alert("Please enter your email at top of page.");
    }

    
}

function toShoppingCart(){
    let email =$.trim($('#email').val());
    if( email !='' ) {
        sessionStorage.setItem('email', email);
        window.location.href = './cart.html';
    } else {
        alert("Please enter your email at top of page.");
    }
}

$('#exampleModal').on('show.bs.modal', function (event) {
    $('#ajaxForm').trigger("reset");
    var button = $(event.relatedTarget);
    var recipient = button.data('whatever');
    var modal = $(this);
    modal.find('#btnSave').off().click(function () {
        setComment(recipient);
    });
});
