import { foodService } from "../services/foodService";

const category = async (name) => {
    const food = await foodService.getFoodByName({ name });
    console.log(food.category)
    return food.category
}

export { category };
