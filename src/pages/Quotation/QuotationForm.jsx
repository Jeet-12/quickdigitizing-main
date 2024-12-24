import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { createQuotation } from "../../Services/Api";
import { SectionTitle } from "../../components";

const QuotationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Real-time validation
  });

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Assuming you have a way to get the auth token, e.g., from context or props
  const token = localStorage.getItem("token"); // Example using localStorage
  // const MAX_FILE_SIZE = 10 * 1024; 
  const onSubmit = async(data) => {
    
    setIsLoading(true);

    try {
   
 

      const formatDate = (date) => {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
        const day = String(d.getDate()).padStart(2, '0');
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    };
      const quotationData = {
         // Include this if necessary
        designName: data.designname, // required
        fabricType: data.fabrictype, // required
        fabric: data.fabric, // required
        noOfColors: Number(data.noofcolors), // required
        colors: data.colors.trim().split(" "), // Converts to array
        width: Number(data.width), // required
        height: Number(data.height), // required
        stitchRange: data.stitch_range, // required
        formatRequired: data.format, // required
        timeToComplete: formatDate(new Date(data.timeTo_complete)), // required
        additionalInformation: data.additionalinformation || "", // optional
        files: data?.files? data.files[0]: null,
        status: 'inProgress', // default value
    };
    

      // Call the createQuotation API service function
      const result = await createQuotation(quotationData, token);
      toast.success(result.message || "Quotation created successfully!");
      reset(); // Reset the form after successful submission
      navigate("/quotation"); // Navigate to quotations list or desired page
    } catch (err) {
      console.error(err);
      toast.error(`Failed to create quotation: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Watch password fields to validate confirm password if needed (not applicable here)
  return (
    <>
      {/* Section Title */}


      <div className="flex flex-col justify-center bg-[#e6f0df] min-h-screen py-8">
        <div className="p-8 xs:p-0 mx-auto md:w-full max-w-4xl">
          {/* Quotation Form Container */}
          <div className="bg-white border border-gray-200 shadow-lg w-full rounded-lg p-4">
            {/* <h2 className="text-3xl text-center text-[#93C572] font-bold mb-6">
              {module} 
            </h2> */}
                  <SectionTitle title={`Quotation Form`} path={`Home > Quotation Form`} />
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Grid Layout for Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Design Name */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Design Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`border ${
                      errors.designname ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("designname", { required: "Design name is required" })}
                    placeholder="Enter design name"
                  />
                  {errors.designname && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.designname.message}
                    </p>
                  )}
                </div>

                {/* Fabric Type */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Fabric Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("fabrictype", { required: "Fabric type is required" })}
                    className={`border ${
                      errors.fabrictype ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                  >
                    <option value="">Select Fabric Type</option>
                    <option value="Soft">Soft</option>
                    <option value="Hard">Hard</option>
                    <option value="Plush">Plush</option>
                  </select>
                  {errors.fabrictype && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fabrictype.message}
                    </p>
                  )}
                </div>

                {/* Fabric */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Fabric <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`border ${
                      errors.fabric ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("fabric", { required: "Fabric is required" })}
                    placeholder="Enter fabric type"
                  />
                  {errors.fabric && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fabric.message}
                    </p>
                  )}
                </div>

                {/* Number of Colors */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Number of Colors <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`border ${
                      errors.noofcolors ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("noofcolors", {
                      required: "Number of colors is required",
                      min: { value: 1, message: "At least one color is required" },
                    })}
                    placeholder="Enter number of colors"
                  />
                  {errors.noofcolors && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.noofcolors.message}
                    </p>
                  )}
                </div>

                {/* Colors */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Colors <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={`border ${
                      errors.colors ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("colors", { required: "Colors are required" })}
                    placeholder="Enter colors separated by commas"
                  />
                  {errors.colors && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.colors.message}
                    </p>
                  )}
                </div>

                {/* Width */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Width (in inches) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`border ${
                      errors.width ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("width", { required: "Width is required" })}
                    placeholder="Enter width"
                  />
                  {errors.width && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.width.message}
                    </p>
                  )}
                </div>

                {/* Height */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Height (in inches) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className={`border ${
                      errors.height ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("height", { required: "Height is required" })}
                    placeholder="Enter height"
                  />
                  {errors.height && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.height.message}
                    </p>
                  )}
                </div>

                {/* Stitch Range */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Stitch Range <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={`border ${
                      errors.stitch_range ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("stitch_range", { required: "Stitch range is required" })}
                  >
                    <option value="">Choose Stitch Range</option>
                    <option value="1000-5000">1000-5000</option>
                    <option value="5000-7000">5000-7000</option>
                    <option value="7000-10000">7000-10000</option>
                    <option value="10000-15000">10000-15000</option>
                    <option value="15000+">15000+</option>
                  </select>
                  {errors.stitch_range && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.stitch_range.message}
                    </p>
                  )}
                </div>

                {/* Format Required */}
                <div className="md:col-span-2">
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Format Required (or specify in text field) <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-col md:flex-row gap-4">
                    <select
                      className={`border ${
                        errors.format ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 text-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                      {...register("format", { required: "Format is required" })}
                    >
                      <option value="">Choose Format</option>
                      <option value="Tajima *.DST">Tajima *.DST</option>
                      <option value="Barudan *.DSB">Barudan *.DSB</option>
                      <option value="Brother *.PES">Brother *.PES</option>
                      <option value="Pfaff *.KSM">Pfaff *.KSM</option>
                      <option value="ZSK *.DSZ">ZSK *.DSZ</option>
                      <option value="Melco *.EXP">Melco *.EXP</option>
                      <option value="Toyota *.10o">Toyota *.10o</option>
                    </select>
                    {/* <input
                      type="text"
                      className={`border ${
                        errors.format ? "border-red-500" : "border-gray-300"
                      } rounded-lg px-3 py-2 text-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                      placeholder="Specify format if not listed"
                      {...register("format_text", { required: "Please specify the format or select from the list" })}
                    /> */}
                  </div>
                  {/* Display combined error if either format or format_text has errors */}
                  {errors.format || errors.format_text ? (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.format?.message || errors.format_text?.message}
                    </p>
                  ) : null}
                </div>

                {/* Time to Complete Job */}
                <div>
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Time to Complete Job <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={`border ${
                      errors.timeTo_complete ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("timeTo_complete", { required: "Completion date is required" })}
                  />
                  {errors.timeTo_complete && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.timeTo_complete.message}
                    </p>
                  )}
                </div>

                {/* Additional Information */}
                <div className="md:col-span-2">
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Additional Information <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`border ${
                      errors.additionalinformation ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full h-24 focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("additionalinformation", { required: "Additional information is required" })}
                    placeholder="Enter any additional information"
                  ></textarea>
                  {errors.additionalinformation && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.additionalinformation.message}
                    </p>
                  )}
                </div>

                {/* Files to Send */}
                {/* <div className="md:col-span-2">
                  <label className="font-semibold text-sm pb-1 block text-gray-600">
                    Files to Send <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    multiple
                    className={`border ${
                      errors.files ? "border-red-500" : "border-gray-300"
                    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
                    {...register("files", { required: "Please upload at least one file" })}
                  />
                  {errors.files && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.files.message}
                    </p>
                  )}
                </div> */}

                {/* Files to Send */}
<div className="md:col-span-2">
  <label className="font-semibold text-sm pb-1 block text-gray-600">
    Files to Send
  </label>
  <input
    type="file"
    multiple
    className={`border ${
      errors.files ? "border-red-500" : "border-gray-300"
    } rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#AFE1AF] focus:border-[#93C572] transition-colors`}
    {...register("files")} // Remove required validation
  />
  {errors.files && (
    <p className="text-red-500 text-xs mt-1">
      {errors.files.message}
    </p>
  )}
</div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`bg-[#93C572] hover:bg-[#79a759] text-white font-semibold w-full py-2 rounded-lg shadow-md transition-colors flex justify-center items-center mt-6 ${
                  !isValid || isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isValid || isLoading}
              >
                {isLoading ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    <span className="inline-block mr-2">Submit</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-4 h-4 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotationForm;
