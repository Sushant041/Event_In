import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ICategory } from "@/lib/database/models/category";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { createCategory, getAllCategories } from "@/lib/actions/categoryAction";


const Dropdown = ({ value, onChangeHandler }: { value: string; onChangeHandler?: () => void }) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [category, setCategory] = useState('')
    
    const handleAddCategory = () =>{
        console.log("categ", category);
        createCategory({categoryName: category.trim()})
        .then((cat) =>{
          setCategories((prev) => {
            return [...prev, cat];
          })
        })
    }

    useEffect(() =>{
       const getCategories = async () =>{
        const categoryList = await getAllCategories();
        categoryList && setCategories(categoryList as ICategory[]);
       }  
       getCategories();
    }, [])
    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 &&
                    categories.map((item) => (
                        <SelectItem key={item._id} value={item._id} className="select-item p-ragular-14">
                            {item.name}
                        </SelectItem>
                    ))
                }
                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full py-3 rounded-sm pl-8 text-slate-600 hover:bg-slate-100 focus:text-black">Add New</AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Add New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type="text" placeholder="Category Name" className="input-field text-black mt-5" onChange={(e)=> {
                                    setCategory(e.target.value)
                                    }} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={ handleAddCategory }>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
        </Select>
    )
}

export default Dropdown