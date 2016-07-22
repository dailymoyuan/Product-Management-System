angular.module("CategoryModule")
.factory("CategoryService", CategoryService);
CategoryService.$inject = ['$http', '$location']; 

function CategoryService($http, $location) { 
    return {
        createCategory: function (Category) {   
            return $http.post('/createCategory',
                {
                    categoryName: Category.categoryName,
                    details: Category.categoryDetails
                }  
            );
        },

        // retrieve all category
        retrieveAllCategory: function () {   
            return $http.get('/retrieveAllCategory');
        },

        // For editing category
        getIdFromURL : function () {        
            var absoluteUrl = $location.absUrl();           
            var segments = absoluteUrl.split("/");
            var CategoryId = segments[segments.length - 1];
            return CategoryId
        },

        getCategoryById: function (CategoryId) {
            console.log(CategoryId);
            return $http.get('/getCategoryById/' + CategoryId);
        },

        // update category
        updateCategory: function (Category, CategoryId) {   

            console.log(Category.categoryName);
            console.log(Category.categoryDetails);
            console.log(CategoryId);

            return $http.post('/updateCategory',
            {
                categoryName: Category.categoryName,   
                details: Category.categoryDetails,
                CategoryId: CategoryId
            }  
        );
        },

        // delete category
        deleteCategoryById: function (CategoryId) {
            console.log(CategoryId);
            return $http['delete']('/deleteCategoryById/' + CategoryId   
           )
        },

        deleteCategory: function (CategoryId) {   
            console.log(CategoryId);
            return $http.post('/deleteCategory',
            {
                CategoryId: CategoryId
            }
        );
        } 
    
    }   // return the whole object 
}








