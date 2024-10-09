package com.br.inovatec.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
public class ReportController {

    @PostMapping
    public void createReport() {

    }

    @GetMapping
    public void listAllReports() {

    }

    @GetMapping("/{id}")
    public void getReportById(@PathVariable long id) {

    }

    @PutMapping
    public void updateReport() {

    }

    @DeleteMapping("/{id}")
    public void deleteReport(@PathVariable long id) {

    }

}