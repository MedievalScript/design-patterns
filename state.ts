/**
 * Una empresa de repuestos para autos desea un programa que le ayude
 * a optimizar el seguimiento de los repuestos que fabrica.
 *
 * > Un repuesto comienza en su estado Design. Una vez aprobado pasa a Review.
 * > Si se aprueba pasa a Construction, si no vuelve a Review
 * > De Construction pasa a Finished
 */

class Replacement {
  private state: ReplacementState;
  approved: boolean;

  constructor() {
    this.approved = false;
    this.state = new Design();
    console.log(this, "initial_state");
  }

  get getState() {
    return this.state;
  }

  set setState(state: ReplacementState) {
    this.state = state;
  }

  approve(approved: boolean) {
    return this.state.approve(this, approved);
  }
}

interface ReplacementState {
  approve(replacement: Replacement, approved: boolean): void;
}

class Design implements ReplacementState {
  approve(replacement: Replacement, approved: boolean): void {
    replacement.approved = approved;
    if (approved) {
      replacement.setState = new Review();
      console.log(replacement, "design_approved");
    }
    if (!approved) {
      console.log(replacement, "design_not_approved");
    }
  }
}

class Review implements ReplacementState {
  approve(replacement: Replacement, approved: boolean): void {
    replacement.approved = approved;
    if (approved) {
      replacement.setState = new Construction();
      console.log(replacement, "review_approved");
    }
    if (!approved) {
      replacement.setState = new Design();
      console.log(replacement, " review_not_approved_back_to_design");
    }
  }
}

class Construction implements ReplacementState {
  approve(replacement: Replacement, approved: boolean): void {
    replacement.approved;
    if (approved) {
      replacement.setState = new Finished();
      console.log(replacement, "construction_approved");
    }
  }
}

class Finished implements ReplacementState {
  approve(replacement: Replacement, approved: boolean): void {
    // ...
  }
}

const replacement = new Replacement();
replacement.approve(true);
replacement.approve(true);
replacement.approve(true);
replacement.approve(true);
