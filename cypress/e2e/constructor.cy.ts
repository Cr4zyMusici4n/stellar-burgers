import { BASE_URL, testUrl } from './../../src/utils/test-utils';

describe('тестирование ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      fixture: 'ingredients'
    });
    cy.visit(`${testUrl}`);
  });

  describe('тесты для страницы конструктора бургера', () => {
    it('добавление ингредиента из списка в конструктор', () => {
      cy.contains('li', 'Биокотлета').find('button').click();

      cy.get('[data-cy=constructor]').contains('li', 'Биокотлета');
    });

    it('открытие модального окна', () => {
      cy.contains('p', 'Биокотлета').click();
      cy.get('[data-cy=modal]').should('exist');
    });

    it('закрытие модального окна по крестику', () => {
      cy.contains('p', 'Биокотлета').click();
      cy.get('[data-cy=modal]').should('exist');

      cy.get('[data-cy=modal-close]').click().should('not.exist');
    });
  });

  describe('тесты на создание заказа', () => {
    beforeEach(() => {
      cy.intercept('GET', `${BASE_URL}/auth/user`, { fixture: 'user.json' });
      cy.intercept('POST', `${BASE_URL}/orders`, { fixture: 'order.json' });

      cy.setCookie('token', 'token');
      window.localStorage.setItem('token', 'token');
    });

    afterEach(() => {
      cy.clearCookie('token');
      window.localStorage.removeItem('token');
    });

    it('создание заказа', () => {
      cy.contains('li', 'Биокотлета').find('button').click();
      cy.contains('li', 'Краторная булка').find('button').click();
      cy.contains('li', 'Соус').find('button').click();

      cy.contains('button', 'Оформить заказ').click();
      cy.get('[data-cy=modal]').should('exist');
      cy.contains('h2', '79517').should('exist');

      cy.get('[data-cy=modal-close]').click().should('not.exist');

      cy.contains('div', 'Выберите булки').should('exist');
      cy.contains('div', 'Выберите начинку').should('exist');
    });
  });
});
