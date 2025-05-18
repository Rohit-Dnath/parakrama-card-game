import { Card, InitialState } from "../../../types/Card.ts";
import { Castable } from "../../cast/abstract/Castable.ts";
import { HealAllCards } from "../../cast/spells/concrates/heal/HealAllCards.ts";
import { HealHero } from "../../cast/spells/concrates/heal/HealHero.ts";
import { HealCard } from "../../cast/spells/concrates/heal/HealCard.ts";
import { Skillable } from "../abstract/Skillable.ts";
import { DealAllEnemyMinions } from "../../cast/spells/concrates/damage/DealAllEnemyMinions.ts";
import { DealAll } from "../../cast/spells/concrates/damage/DealAll.ts";
import { DealAllEnemy } from "../../cast/spells/concrates/damage/DealAllEnemy.ts";
import { DealRandomEnemy } from "../../cast/spells/concrates/damage/DealRandomEnemy.ts";
import { EmpowerRandomCard } from "../../cast/spells/concrates/mixed/EmpowerRandomCard.ts";
import { GainArmor, GiveArmor } from "../../cast/spells/concrates/armor/GiveArmor.ts";
import { GainHealthAmountOfCardsInYourHand } from "../../cast/spells/concrates/heal/GainHealthAmountOfCardsInYourHand.ts";
import { HealCardRandom } from "../../cast/spells/concrates/heal/HealCardRandom.ts";
import { DrawCard } from "../../cast/spells/concrates/draw/DrawCard.ts";
function createSkill(skillData: {
  type: string;
  amount?: number;
}): Castable | null {
  switch (skillData.type) {
    case "HealCard":
      return new HealCard(skillData.amount!);
    case "HealHero":
      return new HealHero(skillData.amount!);
    case "HealAllCards":
      return new HealAllCards(skillData.amount!);
    case "HealCardRandom":
      return new HealCardRandom(skillData.amount!);
    case "DealRandomEnemy":
      return new DealRandomEnemy(skillData.amount!);
    case "DealAllEnemyMinions":
      return new DealAllEnemyMinions(skillData.amount!);
    case "DealAllEnemy":
      return new DealAllEnemy(skillData.amount!);
    case "DealAll":
      return new DealAll(skillData.amount!);
    case "EmpowerRandomCard":
      return new EmpowerRandomCard(skillData.amount!);
    case "GiveArmor":
      return new GiveArmor(skillData.amount!);
    case "GainHealthAmountOfCardsInYourHand":
      return new GainHealthAmountOfCardsInYourHand();
    case "DrawCard":
      return new DrawCard();
    default:
      return null;
  }
}

export class SkillManager implements Skillable {
  castSkills(
    state: InitialState,
    card: Card,
    actionMaker: "player" | "enemy"
  ): void {
    const skills = card.cardSkills
      .map(createSkill)
      .filter((skill) => skill !== null);
    skills.forEach((skill) => {
      skill.cast(state, card, actionMaker);
    });
  }
}
