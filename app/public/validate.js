// Validation rules to prevent form empty values
$(".ui.form").form({
    fields: {
        name: {
            identifier: "userName",
            rules: [
                {
                    type: "empty"
                }
            ]
        },
        ImgURl: {
            identifier: "userImageUrl",
            rules: [
                {
                    type: "url",
                }
            ]
        }
    },
    on: "blur"
});

// Add rule to all dropdown inputs questions
let questions = $("input[name^='question_']");
for (let question of questions) {
    $(".ui.form").form("add rule", question.name, {
        rules: [
            {
                type: "empty",
                prompt: "Please select an option from {name}"
            }
        ]
    });
}


