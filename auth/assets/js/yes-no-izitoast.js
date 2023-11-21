document.getElementById("showYesNo").addEventListener("click", function () {
    iziToast.show({
        class: 'custom-class',
        layout: 2, // Set the layout type to '2' for Yes/No options.
        progressBar: false,
        close: false,
        overlay: true,
        displayMode: "once",
        id: "question",
        title: "Question",
        message: "Do you want to proceed?",
        position: "center",
        buttons: [
            ["<button>Yes</button>", function (instance, toast) {
                // Handle "Yes" button click here
                const form = document.getElementById("reset-pass-form");
                setTimeout(function () {
                    form.submit();    
                }, 1000);
                confetti();
                
                instance.hide({
                    transitionOut: 'fadeOut',
                }, toast);
            }, true], // The true parameter sets this as the "Yes" button.
            ["<button>No</button>", function (instance, toast) {
                // Handle "No" button click here
                instance.hide({
                    transitionOut: 'fadeOut',
                }, toast);
            }],
        ],
       
    });

});