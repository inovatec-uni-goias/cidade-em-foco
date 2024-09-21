package com.br.inovatec.service;

import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import com.br.inovatec.entity.Report;
import com.br.inovatec.repository.ReportRepository;

@Service
public class ReportService {

    @Autowired
    private ReportRepository reportRepository;

    public Report createReport(Report report) {
        report.setDate(LocalDateTime.now());
        return reportRepository.save(report);
    }

    public List<Report> listReports() {
        return reportRepository.findAll();
    }

    public Report findReportById(Long id) {
        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Denúncia não encontrada"));

        return report;
    }

    public Report updateReport(Long id, Report reportUpdate) {
        Report report = findReportById(id);
        report.setLatitude(reportUpdate.getLatitude());
        report.setLongitude(reportUpdate.getLongitude());

        return reportRepository.save(report);
    }

    public void deleteReport(Long id) {
        if (!reportRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                    "Não foi possível deletar, denúncia não encontrada");
        }

        reportRepository.deleteById(id);
    }

}
