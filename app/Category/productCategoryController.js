angular.module("CategoryModule")
.controller("CategoryCtrl", CategoryCtrl);
CategoryCtrl.$inject = ['$scope', '$timeout', 'CategoryService', 'ValidationService']; 
function CategoryCtrl($scope, $timeout, CategoryService, ValidationService) 
{ 
    $scope.Category = {
        categoryName: "",
        categoryDetails: ""
    };

    $scope.message = {
        SuccessfulMessage: false,
        successfulMessage: ""
    };

    $scope.validationResult = {
        ValidationError: false,
        validationMessage: ""
    }

    function ClearMessage() {
        $scope.message.SuccessfulMessage = false;
        $scope.message.successfulMessage = "";
    }

    function displayMessage() {
        $scope.message.SuccessfulMessage = true;
        $scope.message.successfulMessage = "A Record added successfully";
    }

    function clearCategory() {
        $scope.Category.categoryName = "";
        $scope.Category.categoryDetails = "";
    }

    $scope.createCategory = function (Category) {
        var validationMessages = ValidationService.ErrorMessage(
        [
            { name: $scope.Category.categoryName || "", errorMessage: 'please enter product category name.' },
            { name: $scope.Category.categoryDetails || "", errorMessage: 'please enter product category details.' },
        ]);

        // if there is input error
        if (validationMessages.length > 0) 
        {   
            $scope.validationResult.ValidationError = true;
            angular.element("#validationErrors").empty();
            validationMessages.forEach(function (errorMessage) {
                angular.element("<li></li>")
                .html(errorMessage)
                .appendTo("#validationErrors")
            });        
        }

        // if there is no error
        else {  
            $scope.validationResult.ValidationError = false;
            CategoryService.createCategory(Category)
            .success(function (data) {

                if (data.status && data.status == 'successful')
                    displayMessage();

                $timeout(function afterTimeOut() {
                    ClearMessage();
                    clearCategory();
                }, 300);
            });
        }
    }
}








