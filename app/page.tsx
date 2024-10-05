'use client'
import { useState } from "react"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DiscountCalculator() {
  const [price, setPrice] = useState("")
  const [discounts, setDiscounts] = useState([""])
  const [exchangeRate, setExchangeRate] = useState("")

  const addDiscount = () => setDiscounts([...discounts, ""])
  const removeDiscount = (index: number) => {
    const newDiscounts = discounts.filter((_, i) => i !== index)
    setDiscounts(newDiscounts)
  }

  const updateDiscount = (index: number, value: string) => {
    const newDiscounts = [...discounts]
    newDiscounts[index] = value
    setDiscounts(newDiscounts)
  }

  const calculateFinalPrice = () => {
    let finalPrice = parseFloat(price)
    if (isNaN(finalPrice)) return { php: 0, jpy: 0 }

    discounts.forEach((discount) => {
      const discountValue = parseFloat(discount)
      if (!isNaN(discountValue)) {
        finalPrice -= (finalPrice * discountValue) / 100
      }
    })

    const php = isNaN(parseFloat(exchangeRate))
      ? 0
      : finalPrice * parseFloat(exchangeRate)

    return {
      jpy: finalPrice.toFixed(2),
      php: php.toFixed(2),
    }
  }

  const { php, jpy } = calculateFinalPrice()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Discount Calculator
        </h1>
        <div className="space-y-4">
          <div>
            <Label htmlFor="price">Original Price (JPY)</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter original price"
            />
          </div>
          {discounts.map((discount, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input
                type="number"
                value={discount}
                onChange={(e) => updateDiscount(index, e.target.value)}
                placeholder={`Discount ${index + 1} (%)`}
              />
              {index === discounts.length - 1 ? (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={addDiscount}
                  className="flex-shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => removeDiscount(index)}
                  className="flex-shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <div>
            <Label htmlFor="exchangeRate">Exchange Rate (1 JPY to PHP)</Label>
            <Input
              id="exchangeRate"
              type="number"
              value={exchangeRate}
              onChange={(e) => setExchangeRate(e.target.value)}
              placeholder="Enter exchange rate"
            />
          </div>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Final Price:</h2>
          <p className="text-xl">
            PHP: <span className="font-bold">{php}</span>
          </p>
          <p className="text-xl">
            JPY: <span className="font-bold">{jpy}</span>
          </p>
        </div>
      </div>
    </div>
  )
}