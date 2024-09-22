package com.br.inovatec.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.br.inovatec.dto.ReportDto;
import com.br.inovatec.entity.Report;
import com.br.inovatec.service.ReportService;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping
    public ResponseEntity<Report> createReport(@RequestBody ReportDto report) {
        if (report.getLatitude() == null || report.getLongitude() == null) {
            return ResponseEntity.badRequest().build();
        }
        Report response = reportService.createReport(report);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<Report>> listAllReports() {
        List<Report> response = reportService.listReports();
        if (response.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getReportById(@PathVariable long id) {
        Report response = reportService.findReportById(id);
        return ResponseEntity.ok().body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Report> updateReport(@PathVariable long id, @RequestBody Report reportUpdate) {
        Report response = reportService.updateReport(id, reportUpdate);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Report> deleteReport(@PathVariable long id) {
        reportService.deleteReport(id);
        return ResponseEntity.noContent().build();

    }

}