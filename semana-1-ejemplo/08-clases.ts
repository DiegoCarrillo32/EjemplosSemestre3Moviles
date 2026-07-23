class Animal {
  public name: string;
  protected energy: number = 100;
  private id: string;

  constructor(name: string) {
    this.name = name;
    this.id = "1";
  }

  move() {}
}

class Dog extends Animal {}
