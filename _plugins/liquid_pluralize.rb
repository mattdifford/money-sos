module Pluralize

	def pluralize(number, singular, plural = nil, output = true)
		number = number.to_i
		if output == true
			if number == 1
				"#{number} #{singular}"
			elsif plural.nil?
				"#{number} #{singular}s"
			else
				"#{number} #{plural}"
			end
		else
			if number == 1
				"#{singular}"
			elsif plural.nil?
				"#{singular}s"
			else
				"#{plural}"
			end
		end
	end

end

Liquid::Template.register_filter(Pluralize)