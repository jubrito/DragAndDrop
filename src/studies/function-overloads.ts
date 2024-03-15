type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Function overloads to define the specific return when typescript can't infer the correct type
function adds(a: string, b: string): string;
function adds(a: number, b: number): number;
function adds(a: string, b: number): string;
function adds(a: number, b: string): string;
function adds(a: Combinable, b: Combinable) {
    // Type guards
    if (typeof a === 'string' || typeof b === 'string'){
        return a.toString() + b.toString();
    }
    return a+b;
}

const result = adds(1,1);