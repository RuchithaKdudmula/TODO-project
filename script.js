function outer() {
  let count = 0;

  return function inner() {
    count++;
    console.log(count);
  };
}

const fn1 = outer();
fn1();
fn1();
