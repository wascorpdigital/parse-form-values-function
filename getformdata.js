export const getFormData = (form) => {
    const formData = {}

    if (!form || form.nodeName !== "FORM") {
        return;
    }

    for (let index = 0; index < form.elements.length; index++) {
        if (form.elements[index].name === "") {
            continue;
        }
        switch (form.elements[index].nodeName) {
            case 'INPUT':
                switch (form.elements[index].type) {
                    case 'text':
                    case 'hidden':
                    case 'email':
                    case 'password':
                    case 'button':
                    case 'reset':
                    case 'submit':
                        if (form.elements[index].value.trim()) {
                            formData[form.elements[index].name] = form.elements[index].value;
                        }
                        break;
                    case 'radio':
                        if (form.elements[index].checked) {
                            formData[form.elements[index].name] = form.elements[index].value;
                        }
                        break;
                    case 'file':
                        // TODO: logic
                        break;
                }
            case 'checkbox':
                if (form.elements[index].checked) {
                    if (form.elements[index].name in formData) {
                        formData[form.elements[index].name] = formData[form.elements[index].name] + ',' + form.elements[index].value;
                    }
                    else {
                        formData[form.elements[index].name] = form.elements[index].value;
                    }
                }
                break;
            case 'TEXTAREA':
                if (form.elements[index].value.trim()) {
                    formData[form.elements[index].name] = form.elements[index].value;
                }
                break;
            case 'SELECT':
                if (form.elements[index].value.trim()) {
                    switch (form.elements[index].type) {
                        case 'select-one':
                            formData[form.elements[index].name] = form.elements[index].value;
                            break;
                        case 'select-multiple':
                            const multi = []
                            for (let i = 0; i < form.elements[index].options.length; i++) {
                                if (form.elements[index].options[i].selected) {
                                    multi.push(form.elements[index].options[i].value)
                                    formData[form.elements[index].name] = multi;
                                }
                            }
                            break;
                    }
                }
                break;
        }
    }

    return formData
}