"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/lib/store";
import type { CartItem } from "@/lib/store";
import type { ProductVariant } from "@/sanity/types/products";
import { toast } from "sonner";

interface EditCartItemModalProps {
  item: CartItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditCartItemModal({ item, open, onOpenChange }: EditCartItemModalProps) {
  const { addItem, removeItem, updateQuantity: updateCartQuantity } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(item.variant);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleSave = () => {
    // If nothing changed, just close
    if (selectedVariant._key === item.variant._key && quantity === item.quantity) {
      onOpenChange(false);
      return;
    }

    // If variant changed
    if (selectedVariant._key !== item.variant._key) {
      // Remove old item
      removeItem(item.id);
      // Add new item (this handles merging if it already exists)
      addItem(item.product, selectedVariant, quantity);
    } else {
      // Only quantity changed
      updateCartQuantity(item.id, quantity);
    }

    toast.success("Cart updated");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-neon/30 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-neon">Edit Item</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          {/* Product Title */}
          <div>
            <h3 className="font-bold text-lg">{item.product.title.en}</h3>
            <p className="text-white/60 text-sm">{item.product.category.name.en}</p>
          </div>

          {/* Variant Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-white/80">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {item.product.variants.map((variant) => (
                <button
                  key={variant._key}
                  onClick={() => setSelectedVariant(variant)}
                  disabled={!variant.availability}
                  className={`rounded-lg px-3 py-1.5 text-sm font-bold transition ${
                    selectedVariant.weight === variant.weight
                      ? "bg-neon text-black shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                      : "border border-neon/30 bg-black text-white/70 hover:border-neon hover:text-neon"
                  } ${!variant.availability ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {variant.weight} {!variant.availability && "(Out of Stock)"}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-white/80">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="rounded-lg border border-neon/30 bg-black p-2 text-neon transition hover:bg-neon/20 hover:border-neon"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-xl font-bold text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-lg border border-neon/30 bg-black p-2 text-neon transition hover:bg-neon/20 hover:border-neon"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Price Summary */}
          <div className="flex justify-between items-center border-t border-neon/20 pt-4">
            <span className="text-white/60">Total Price:</span>
            <span className="text-xl font-black text-neon">
              {(selectedVariant.price * quantity).toFixed(2)} TND
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-neon/30 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-neon text-black hover:bg-neon/80 font-bold"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
