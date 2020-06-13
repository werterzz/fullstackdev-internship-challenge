<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

    <!-- BoostrapCDN -->
    <!-- CSS only -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">

    <!-- JS, Popper.js, and jQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>


    <!-- css -->
    <link rel="stylesheet" href="/css/page.css">

    <!-- Styles -->
    <style>
        body {
            background-color: #1E3148;
            color: white;
            overflow: hidden;

        }

        bgLayer {
            z-index: -1;
        }

        .productCard {
            position: relative;
        }

        .pictureCard {
            position: absolute;
        }

        .textCard {
            position: absolute;
        }

        .modalFontColor {
            color: #707070;
        }
    </style>

</head>

<body>
    <h1 class="mt-5 text-center">I GEAR GEEK : Vending Machine Problem</h1>
    <div class="d-flex justify-content-center mt-3">
        <img src="/images/yellowHLineWeb.svg" alt="" width="80%">
    </div>
    <div class="container-fluid">
        <div class="row">
            <div class="col-9 d-flex">
                <div class="flex-column w-100">
                    <h4 class="mt-4 offset-4 pl-2">Please insert coin and select product</h4>

                    <!-- Product List -->
                    <div class="flex-row offset-2" id="productList">
                    </div>
                </div>
                <img src="/images/yellowVLineWeb.svg" alt="" style="height:75vh" class="mt-3 ml-auto bgLayer">
            </div>

            <!-- Insert Coin -->
            <div class="col-3 position-relative">
                <div class="d-flex mt-4 align-items-center">
                    <h4 class="mr-3">Total coin: </h4>
                    <h4 class="" id="totalCoin">0</h4>
                    <img id="refund" src="/images/refundButton.svg" alt="" style="width: 26%;" class="mb-2 ml-3" data-toggle="modal" data-target="#productModal">
                </div>

                <div class="flex-row mt-5">
                    <img id="oneCoin" src="/images/oneCoin.svg" alt="" width="18%" class="mr-3">
                    <img id="twoCoin" src="/images/twoCoin.svg" alt="" width="18%" class="mr-3">
                    <img id="fiveCoin" src="/images/fiveCoin.svg" alt="" width="18%" class="mr-3">
                    <img id="tenCoin" src="/images/tenCoin.svg" alt="" width="18%">
                </div>
            </div>
        </div>
    </div>



    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div id="productModalContent" class="modal-content w-75" style="height: 60vh; border-radius: 3%" data-dismiss="modal" style="color: #707070;">

            </div>
        </div>
    </div>

    <!-- Load Json data -->
    
    <script src="/js/loadJson.js"></script>
</body>



</html>

