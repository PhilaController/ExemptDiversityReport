# Exempt Employee Diversity Review

The code behind the interactive review of the diversity of the City of Philadelphia's exempt workforce. The annual
reviews are available on the City Controller's website:

- [FY20](https://controller.phila.gov/philadelphia-audits/fy21-exempt-employee-diversity/)
- [FY20](https://controller.phila.gov/philadelphia-audits/fy20-exempt-employee-diversity/)
- [FY19](https://controller.phila.gov/philadelphia-audits/fy19-exempt-employee-diversity/)
- [FY18](https://controller.phila.gov/philadelphia-audits/fy18-exempt-employee-diversity/)



![Interactive Dashboard Part 1](public/report-screenshot-1.png)
![Interactive Dashboard Part 2](public/report-screenshot-2.png)

## Tools

The application is built using a combination of open-source tools, including
[vue](https://github.com/vuejs/vue), [vuetify](https://github.com/vuetifyjs/vuetify), 
and [d3](https://github.com/d3/d3).

## Development

### Project setup
```
yarn install
```
### Compiles and hot-reloads for development

Serve for a specific fiscal year:

```
make serve fy=2020
```

### Compiles and minifies for production

Build for a specific fiscal year:
```
make build fy=2020
```
