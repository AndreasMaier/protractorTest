var baseUrl = "http://localhost:8888";

describe('CashLoad Flow', function () {
    it('test setup', function () {
        browser.driver.manage().window().setSize(800, 1200);
        browser.driver.get(baseUrl);
    });

    userSeesHomeScrees();
    userSeesNoTodos();
    userAddsNewTodo();
    userAddsAnotherTodo();
    userDeletesCleanUpTodo();

    function userSeesHomeScrees() {
        it('takes the user to the home page by default', function () {
            expect($('.home-header').getText()).toContain('These are your Todos:');
        });
    }

    function userSeesNoTodos() {
        it('does not have any Todos by default', function () {
            expect(element(by.repeater('todo in todos')).$$().count()).toBe(0);
        });
    }

    function userAddsNewTodo() {
        it('shows the todo in the list', function () {
            element(by.model('newTodo')).sendKeys('Clean up!');
            element(by.css('.add-todo-button')).click();

            expect(element.all(by.repeater('todo in todos')).count()).toBe(1);
        });

        it('clears the input text field', function () {
            expect(element(by.model('newTodo')).getAttribute('value')).toBe('');
        });

        it('show the new Todo in the list', function () {
            expect(element.all(by.repeater('todo in todos')).get(0).getText()).toContain('Clean up!');
        });
    }

    function userAddsAnotherTodo() {
        it('shows the todo in the list', function () {
            element(by.model('newTodo')).sendKeys('Do fun stuff!');
            element(by.css('.add-todo-button')).click();

            expect(element.all(by.repeater('todo in todos')).count()).toBe(2);
        });
    }

    function userDeletesCleanUpTodo() {
        it('shows the todo in the list', function () {
            element.all(by.repeater('todo in todos')).get(0).$('.delete-button').click();

            expect(element.all(by.repeater('todo in todos')).count()).toBe(1);
        });

        it('shows the correct remaining item', function () {
            expect(element.all(by.repeater('todo in todos')).get(0).getText()).toContain('Do fun stuff!');
        });
    }
});