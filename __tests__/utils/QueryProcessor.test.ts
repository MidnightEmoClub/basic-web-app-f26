import QueryProcessor from "../../utils/QueryProcessor";
import '@testing-library/jest-dom'

describe("QueryProcessor", () => {
    test("should return a string", () => {
        const query = "test";
        const response: string = QueryProcessor(query);
        expect(typeof response).toBe("string");
    });

    test('should return shakespeare description', () => {
        const query = "shakespeare";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
            "English poet, playwright, and actor, widely regarded as the greatest " +
            "writer in the English language and the world's pre-eminent dramatist."
        ));
    });

    test('should return name', () => {
        const query = "What is your name?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "Joey"
        ));
    })

    test('should return Andrew ID', () => {
        const query = "What is your Andrew ID?";
        const response: string = QueryProcessor(query);
        expect(response).toBe((
            "wentaod"
        ));
    })

    test('should return the largest of the given numbers', () => {
        const query = "Which of the following numbers is the largest: 53, 30, 78?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("78");
    })

    test('should return the largest number when it is not last', () => {
        const query = "Which of the following numbers is the largest: 99, 42, 18?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("99");
    })

    test('should return an empty string for a largest query without numbers', () => {
        const query = "Which number is the largest?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("");
    })

    test('should return the sum of the given numbers', () => {
        const query = "What is 99 plus 28?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("127");
    })

    test('should return the sum of more than two numbers', () => {
        const query = "What is 5 plus 10 plus 20?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("35");
    })

    test('should return an empty string for a plus query without numbers', () => {
        const query = "What is the sum of these numbers plus?";
        const response: string = QueryProcessor(query);
        expect(response).toBe("");
    })
});