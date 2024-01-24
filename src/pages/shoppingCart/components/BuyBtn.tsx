import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { usePurchasedList, useShoppingCart, useUserData } from "@/store";
import updateTableItem from "@/utils/updateTableItem";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import getTableItemData from "@/utils/getTableItemData";
import insertTableDataFrom from "@/utils/insertTableItem";

export default function BuyBtn({ chosenProducts }: { chosenProducts: productType[] }) {
    const { clearProducts, amountProducts } = useShoppingCart((store) => store);
    const stripe = useStripe();
    const elements = useElements();
    const { setPurchasedList, purchasedList } = usePurchasedList((store) => store);
    const [formLoading, setFormLoading] = useState(false);
    const {
        authenticated,
        data: { user: userData },
    } = useUserData((store) => store);
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            if (!stripe || !elements) return;
            setFormLoading(true);
            const { error } = await stripe.createPaymentMethod({
                type: "card",
                card: elements.getElement(CardElement)!,
            });
            if (authenticated) {
                try {
                    const userShoppingCart = await getTableItemData<
                        shoppingCartItemType,
                        string,
                        shoppingCartItemType[]
                    >(
                        "shopping-cart",
                        "email",
                        userData?.email ?? "hatemziad384@gmail.com",
                    );
                    if (userShoppingCart?.length === 0) throw "empty cart";
                    const purchased = userShoppingCart
                        ? userShoppingCart[0]?.purchased ?? []
                        : [];
                    const { error } = await updateTableItem<{ purchased: string[] }>(
                        "shopping-cart",
                        "email",
                        userData?.email ?? "",
                        { purchased: [...purchased, ...amountProducts.map(String)] },
                    );
                    setPurchasedList([...purchasedList, ...chosenProducts], false)
                    if (error) throw "updating error";
                } catch {
                    const { error } = await insertTableDataFrom("shopping-cart", {
                        email: userData?.email ?? "",
                        purchased: amountProducts.map(String),
                    });
                    if (error) throw "";
                }
            } else throw "not authenticated";
            if (error) throw error;
            toast.success("your payment was successful");
            clearProducts();
        } catch (error) {
            toast.error("error - something went wrong");
        } finally {
            setFormLoading(false);
        }
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild className="w-full">
                    <Button className="w-full" aria-label="buy button">
                        buy them!
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>payment</DialogTitle>
                        <DialogDescription>
                            this is not a real payment, you can write anything
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <CardElement className="dark:bg-white dark:p-2 dark:rounded-sm" />
                        </div>
                        <Button
                            aria-label="buy button"
                            className="w-full"
                            disabled={formLoading}
                        >
                            {formLoading ? "loading..." : "buy them!"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
