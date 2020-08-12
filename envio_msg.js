/*    
User Story: Eu como usuário quero mandar uma mensagem para um destinatário para que eu possa me comunicar de forma mais rápida.
 
Critérios de aceite:
- O Campo “Mensagem” e “Número do destinatário” devem ser obrigatórios;
- O Campo “Mensagem” deve aceitar até 100 caracteres;
- O Campo “Número do destinatário” deve ser de 11 dígitos;
- É permitido ao destinatário receber apenas uma mensagem no mês, independente de remetente.

*/

 describe('Envio de mensagem para destinatario', () => {

    it('Validacao da quantidade mensal de mensagem para mesmo destinatario', () => {
        cy.request({
            url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
            method: 'POST',
            body: {
                mensagem: 'Primeira mensagem enviada ao destinatario',
                num_destinatario: '12345678901',
                data_envio: Cypress.moment().format('DD/MM/YYYY')
            }
        }).as('response')  

            cy.get('@response').then(res => {
                expect(res.body.statusCode).to.be.equal(200)
                expect(res.body.body).to.be.equal('"Mensagem enviada com sucesso"')
            })
            
        cy.request({
            url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
            method: 'POST',
            body: {
                mensagem: 'Segunda mensagem enviada ao destinatario',
                num_destinatario: '12345678901',
                data_envio: Cypress.moment().format('DD/MM/YYYY')
            }
        }).as('response') 

            cy.get('@response').then(res => {
                expect(res.body.statusCode).to.be.equal(400)
                expect(res.body.body).to.be.equal('"Numero inválido"')
            })

    })  
 
    describe('Validacao dos campos de preenchimento obrigatorio', () => {

        it('Validacao do envio com campo de mensagem em branco', () => {
            cy.request({
                url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
                method: 'POST',
                body: {
                    mensagem: '',
                    num_destinatario: '63524187021',
                    data_envio: Cypress.moment().format('DD/MM/YYYY')
                }
            }).as('response')  
            
                cy.get('@response').then(res => {
                    expect(res.body.statusCode).to.be.equal(400)
                    expect(res.body.body).to.be.not.equal('"Mensagem enviada com sucesso"')
                })  
        })

        it('Validacao do envio com campo do numero de destinatario em branco', () => {
            cy.request({
                url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
                method: 'POST',
                body: {
                    mensagem: 'Mensagem sem numero de destinatario',
                    num_destinatario: '',
                    data_envio: Cypress.moment().format('DD/MM/YYYY')
                }
            }).as('response')  

                cy.get('@response').then(res => {
                    expect(res.body.statusCode).to.be.equal(400)
                    expect(res.body.body).to.be.equal('"Numero inválido"')
                })


        })

        it('Validacao do envio com campos de mensagem e numero de destinatario em branco', () => {
            cy.request({
                url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
                method: 'POST',
                body: {
                    mensagem: '',
                    num_destinatario: '',
                    data_envio: Cypress.moment().format('DD/MM/YYYY')

                }
            }).as('response')  
            
                cy.get('@response').then(res => {
                    expect(res.body.statusCode).to.be.equal(400)
                    expect(res.body.body).to.be.equal('"Numero inválido"')
                    expect(res.body.body).to.be.not.equal('"Mensagem enviada com sucesso"')
                })
        })
    
    })

    describe('Validacoes especificas do tamanho dos campos', () => {

        it('Preenchimento do campo de mensagem com mais de 100 caracteres', () => {
            cy.request({
                url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
                method: 'POST',
                body: {
                    mensagem: 'Uma mensagem que contenha um numero de caracteres superior a 100, para a realizaao do teste de tamanho da mensagem.',
                    num_destinatario: '85743269870',
                    data_envio: Cypress.moment().format('DD/MM/YYYY')
                }
            }).as('response')  
            
                cy.get('@response').then(res => {
                    expect(res.body.statusCode).to.be.equal(400)
                    expect(res.body.body).to.be.not.equal('"Mensagem enviada com sucesso"')
                })
        })  
        
        it('Preenchimento do campo do numero de destinatario com menos de 11 digitos', () => {
            cy.request({
                url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
                method: 'POST',
                body: {
                    mensagem: 'Mensagem com numero de destinatario menor que 11 digitos.',
                    num_destinatario: '85713',
                    data_envio: Cypress.moment().format('DD/MM/YYYY')
                }
            }).as('response')  
            
                cy.get('@response').then(res => {
                    expect(res.body.statusCode).to.be.equal(400)
                    expect(res.body.body).to.be.equal('"Numero inválido"')
                })
        }) 

        it('Preenchimento do campo do numero de destinatario com mais de 11 digitos', () => {
            cy.request({
                url:'https://7eb984w4j4.execute-api.us-east-1.amazonaws.com/dev/lambdastresstest',
                method: 'POST',
                body: {
                    mensagem: 'Mensagem com numero de destinatario menor que 11 digitos.',
                    num_destinatario: '8615002477813',
                    data_envio: Cypress.moment().format('DD/MM/YYYY')
                }
            }).as('response')  
            
                cy.get('@response').then(res => {
                    expect(res.body.statusCode).to.be.equal(400)
                    expect(res.body.body).to.be.equal('"Numero inválido"')
                }) 
        }) 
    
    }) 
   
})  
        
