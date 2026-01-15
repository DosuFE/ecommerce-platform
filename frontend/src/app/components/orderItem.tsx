import Image from 'next/image';
export default function OrderItem({item}: {item: string | any}) {
    return (
        <>
             <div key={item.id} className="flex items-center space-x-4">
                <Image
                    src={item.image || '/placeholder-product.jpg'}                                    alt={item.name}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    width={64}
                    height={64}
                />
                <div className="flex-1">
                    <h5 className="font-medium text-gray-900">
                        {item.name}
                    </h5>
                    <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                    </p>
                </div>
                                
                <div className="text-right">
                    <p className="font-medium text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} each
                    </p>
                </div>
            </div>
        </>
    )
}