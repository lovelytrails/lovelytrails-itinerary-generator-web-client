"use client";
import * as React from "react"
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const Contact17 = () => {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companySize: "",
      message: "",
      referrer: "",
    },
  });

  const [fromOpen, setFromDateOpen] = React.useState(false)
  const [fromDate, setFromDate] = React.useState<Date | undefined>(undefined)
  const [toOpen, setToDateOpen] = React.useState(false)
  const [toDate, setToDate] = React.useState<Date | undefined>(undefined)

  const [dayBlocks, setDayBlocks] = React.useState([{ uid: crypto.randomUUID() }]);
  const [costBlocks, setCostBlocks] = React.useState([{ uid: crypto.randomUUID() }]);

  const selectedDays = parseInt(form.watch("days") || "0", 10);

  const addDayBlock = () => {
    setDayBlocks([...dayBlocks, { uid: crypto.randomUUID() }]);
  };

  const deleteDayBlock = (uid: string) => {
    if (dayBlocks.length === 1) return; // always keep one
    setDayBlocks(dayBlocks.filter((block) => block.uid !== uid));
  };

  const addCostBlock = () => {
    if (costBlocks.length >= 10) return;
    setCostBlocks([...costBlocks, { uid: crypto.randomUUID() }]);
  };

  const deleteCostBlock = (uid: string) => {
    if (costBlocks.length === 1) return; // always keep one
    setCostBlocks(costBlocks.filter((block) => block.uid !== uid));
  };

  const onSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    companySize: string;
    message: string;
    referrer: string;
  }) => {
    console.log(data);
    // Add your form submission logic here
  };

  return (
    <section className="bg-muted/200 py-32">
      <div className="container">
        <div className="mt-8 grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-2 lg:grid-rows-[min-content_1fr]">
          <h2 className="order-1 text-4xl font-medium tracking-tight md:order-none md:text-5xl">
            Itinerary Generator
          </h2>
          <div className="order-2 md:order-none md:row-span-2">
            <div className="bg-background border-border rounded-lg border p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-6 sm:grid-cols-2"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Dubai - 6 Days Trip" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Ashok" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pax"
                    render={({ field }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="6 Adults + 3 Child (7, 3 year & 1 infant)" />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fromDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Date</FormLabel>
                        <Popover open={fromOpen} onOpenChange={setFromDateOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <button
                                type="button"
                                className={`w-full px-3 py-2 text-left border rounded-md bg-background text-sm ${
                                  field.value ? "text-foreground" : "text-muted-foreground"
                                }`}
                              >
                                {field.value ? format(field.value, "dd MMM yyyy") : "Pick a date"}
                              </button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(selectedDate) => {
                                field.onChange(selectedDate); // ✅ updates react-hook-form
                                setFromDateOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="toDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Date</FormLabel>
                        <Popover open={toOpen} onOpenChange={setToDateOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <button
                                type="button"
                                className={`w-full px-3 py-2 text-left border rounded-md bg-background text-sm ${
                                  field.value ? "text-foreground" : "text-muted-foreground"
                                }`}
                              >
                                {field.value ? format(field.value, "dd MMM yyyy") : "Pick a date"}
                              </button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              captionLayout="dropdown"
                              onSelect={(selectedDate) => {
                                field.onChange(selectedDate); // ✅ updates react-hook-form
                                setToDateOpen(false);
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold">Day Details</h3>
                    <FormField
                      control={form.control}
                      name="days"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of days</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select number of days" />
                              </SelectTrigger>
                              <SelectContent className="max-h-80 overflow-y-auto">
                                {Array.from({ length: 50 }, (_, i) => (
                                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                                    {i + 1}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <br />
                    {selectedDays > 0 && 
                      dayBlocks.map((block, index) => (
                      <div key={block.uid} className="space-y-2 border p-4 rounded-md relative">
                        <FormField
                          control={form.control}
                          name={`day-${block.uid}-number`}
                          rules={{
                            required: "Day number is required",
                            validate: (value) => {
                              const num = parseInt(value, 10);
                              if (isNaN(num)) return "Must be a number";
                              if (num < 1) return "Day must be at least 1";
                              if (num > selectedDays) return `Day cannot exceed ${selectedDays}`;
                              return true;
                            },
                          }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Day #</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  placeholder="Enter day number"
                                  onKeyDown={(e) => {
                                    const key = e.key;

                                    // Allow navigation keys
                                    if (
                                      key === "Backspace" ||
                                      key === "Delete" ||
                                      key === "ArrowLeft" ||
                                      key === "ArrowRight" ||
                                      key === "Tab"
                                    ) {
                                      return;
                                    }

                                    // Allow only digits
                                    if (!/^\d$/.test(key)) {
                                      e.preventDefault();
                                      return;
                                    }

                                    // Predict resulting value
                                    const currentValue = e.currentTarget.value;
                                    const selectionStart = e.currentTarget.selectionStart ?? currentValue.length;
                                    const selectionEnd = e.currentTarget.selectionEnd ?? currentValue.length;

                                    const predictedValue =
                                      currentValue.slice(0, selectionStart) + key + currentValue.slice(selectionEnd);
                                    const predictedNumber = parseInt(predictedValue, 10);

                                    // Block if out of range
                                    if (isNaN(predictedNumber) || predictedNumber < 1 || predictedNumber > selectedDays) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              </FormControl>
                              {fieldState.error && (
                                <p className="text-sm text-destructive mt-1">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`day-${block.uid}-details`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Day Details</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Describe activities for this day"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          {index === dayBlocks.length - 1 && dayBlocks.length < selectedDays ? (
                            <Button type="button" onClick={addDayBlock} variant="outline">
                              ➕ Add Day
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              onClick={() => deleteDayBlock(block.uid)}
                              variant="destructive"
                            >
                              🗑️ Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <br />
                  <div className="col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold mt-6">Cost Details</h3>
                    {costBlocks.map((block, index) => (
                      <div key={block.uid} className="space-y-2 border p-4 rounded-md relative">
                        <FormField
                          control={form.control}
                          name={`cost-${block.uid}-entity`}
                          rules={{ required: "Cost entity is required" }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Cost Entity</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="e.g. Hotel, Transport, Meals"
                                />
                              </FormControl>
                              {fieldState.error && (
                                <p className="text-sm text-destructive mt-1">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`cost-${block.uid}-details`}
                          rules={{ required: "Cost details are required" }}
                          render={({ field, fieldState }) => (
                            <FormItem>
                              <FormLabel>Cost Details</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Describe the cost breakdown or notes"
                                />
                              </FormControl>
                              {fieldState.error && (
                                <p className="text-sm text-destructive mt-1">
                                  {fieldState.error.message}
                                </p>
                              )}
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2 mt-2">
                          {index === costBlocks.length - 1 && costBlocks.length < 10 ? (
                            <Button type="button" onClick={addCostBlock} variant="outline">
                              ➕ Add Cost
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              onClick={() => deleteCostBlock(block.uid)}
                              variant="destructive"
                            >
                              🗑️ Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="inclusions"
                    rules={{ required: "Inclusions are required" }}
                    render={({ field, fieldState }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Inclusions</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Provide the list of inclusions for this trip..."
                          />
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="exclusionss"
                    rules={{ required: "Exclusions are required" }}
                    render={({ field, fieldState }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Exclusions</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Provide the list of exclusions for this trip..."
                          />
                        </FormControl>
                        {fieldState.error && (
                          <p className="text-sm text-destructive mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="approximateCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approximate Cost</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select cost range" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="5k-15k">₹ 5K - ₹ 15K</SelectItem>
                              <SelectItem value="15k-30k">
                                ₹ 15K - ₹ 30K
                              </SelectItem>
                              <SelectItem value="30k-50k">
                                ₹ 30K - ₹ 50K
                              </SelectItem>
                              <SelectItem value="50k-100k">
                                ₹ 50K - ₹ 100K
                              </SelectItem>
                              <SelectItem value="100k-250k">
                                ₹ 100K - ₹ 250K
                              </SelectItem>
                              <SelectItem value="250k+">₹ 250K+</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="sm:col-span-2">
                    Submit
                  </Button>
                  <p className="text-muted-foreground text-xs sm:col-span-2">
                    You acknowledge that you've reviewed and agreed to our{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>
                  </p>
                </form>
              </Form>
            </div>
          </div>
          <div className="order-3 my-6 md:order-none">
            <p className="my-6 font-bold">
              Share your itinerary details
            </p>
            <ul className="space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Title:
                <span className="italic text-accent">
                  Dubai - 6 Days Trip
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Name:
                <span className="italic text-accent">
                  Ashok
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Pax:
                <span className="italic text-accent">
                  6 Adults + 3 Child (7, 3 year & 1 infant)
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="bg-background flex size-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" />
                </span>
                Date:
                <span className="italic text-accent">
                  03 Feb 2026 - 08 Feb 2026
                </span>
              </li>
            </ul>
            <p className="my-6 font-bold">
              Day wise details, cost, inclusions and exclusions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Contact17 };
