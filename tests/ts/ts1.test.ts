interface typeProps {
    func: (a: number) => void;
    func2(a: string, b: number): void | null;

}

class TypeScriptTest {
    // Function with a single argument
    func(a: number): void {
        console.log(`Function with a single argument: ${a}`);
    }

}